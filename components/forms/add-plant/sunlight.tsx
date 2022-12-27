import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Spinner,
} from "@chakra-ui/react";
import { Plant } from "@main/common-types/plant";
import { useFirestoreQuery } from "@main/data-models";
import useFormContext from "@main/hooks/useFormContext";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useState } from "react";

/**
 * Props for the AddSunlightAmount component
 */
interface AddSunlightAmountProps {
  /**
   * Event handler for the "Next" button's onClick event
   */
  onNextButtonClick: () => void;
}

const AddSunlightAmount: React.FC<AddSunlightAmountProps> = ({
  onNextButtonClick,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, error } = useFirestoreQuery<Plant>(`plants/`);
  const { formData, setSunlight } = useFormContext();
  const [distance, setDistance] = useState(
    formData.sunlight ? formData.sunlight : 0
  );

  if (isLoading) {
    return (
      <div className="bg-monstera-100 fixed flex justify-center items-center w-screen h-screen">
        <Spinner className="relative bottom-[96px] " />
      </div>
    );
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-col items-center mx-[24px]">
      <section className="md:pt-[121px] pt-[60px] pb-[80px] flex flex-col items-center gap-[16px] md:gap-[32px]">
        <div className="flex items-center justify-between w-full">
          <motion.div animate={{ x: distance * 1 }} className="text-[64px]">
            🪟
          </motion.div>
          <motion.div animate={{ x: distance * -1 }} className="text-[64px]">
            {data &&
              data
                .filter((plant) => plant.id === id)
                .map((plant, index) => <div key={index}>{plant.emoji}</div>)}
          </motion.div>
        </div>
        {data &&
          data
            .filter((plant) => plant.id === id)
            .map((plant, index) => (
              <h2
                key={index}
                className="text-[20px] text-[#32695F] text-center"
              >
                How much sunlight will your {plant.commonName[0].toLowerCase()}{" "}
                be getting?
              </h2>
            ))}
      </section>
      <section className="w-[92%] md:w-1/2">
        <Slider
          aria-label="sunlight-slider"
          onChange={(val) => {
            setSunlight(val);
            setDistance(val);
          }}
          value={formData.sunlight}
          defaultValue={formData.sunlight ? formData.sunlight : 0}
          step={25}
          name="sunlight"
        >
          <div className="mt-8 text-[12px] font-medium text-[#E6BD77]">
            <SliderMark value={0} className="-translate-x-1/2">
              <Box
                className={`${
                  distance >= 0 && distance <= 12
                    ? "text-amber-900 text-[16px] transiton-all font-bold"
                    : ""
                }`}
              >
                Dark
              </Box>
            </SliderMark>
            <SliderMark value={25} className="-translate-x-1/2">
              <Box
                className={`${
                  distance >= 13 && distance <= 37
                    ? "text-amber-800 text-[16px] font-bold"
                    : ""
                }`}
              >
                Low
              </Box>
            </SliderMark>
            <SliderMark value={50} className="-translate-x-1/2">
              <Box
                className={`${
                  distance >= 38 && distance <= 62
                    ? "text-amber-600 text-[16px] font-bold"
                    : ""
                }`}
              >
                Medium
              </Box>
            </SliderMark>
            <SliderMark value={75} className="-translate-x-1/2">
              <Box
                className={`${
                  distance >= 63 && distance <= 87
                    ? "text-amber-500 text-[16px] font-bold"
                    : ""
                }`}
              >
                Indirect
              </Box>
            </SliderMark>
            <SliderMark value={95} className="-translate-x-[25%] md:translate-x-[10%]">
              <Box
                className={`${
                  distance >= 88 && distance <= 100
                    ? "text-amber-400 text-[16px] font-bold"
                    : ""
                }`}
              >
                Direct
              </Box>
            </SliderMark>
          </div>
          <SliderTrack bg="#ede9ce" height="14px" borderRadius="999px">
            <SliderFilledTrack bg="#ffb400" />
          </SliderTrack>
          <SliderThumb className="p-[15px]">
            <div className="relative top-[1px] text-[24px]">☀️</div>
          </SliderThumb>
        </Slider>
      </section>

      <section className="fixed bottom-safe min-w-1/2 w-[342px] md:pb-[80px]">
        <Box
          className="shadow tracking-tight font-[500]"
          as="button"
          lineHeight="1.2"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          py="11px"
          width="100%"
          borderRadius="999px"
          fontSize="18px"
          fontWeight="500"
          bg="#ffffff"
          color="#606F73"
          _hover={{ background: "#fcfcfc", transform: "scale(1.01)" }}
          _active={{
            bg: "#ffffff",
            transform: "scale(.97)",
            borderColor: "rgba(252, 186, 3, .75)",
          }}
          _focus={{
            boxShadow:
              "0 0 1px 1px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
          }}
          onClick={onNextButtonClick}
        >
          Next
        </Box>
      </section>
    </div>
  );
};

export default AddSunlightAmount;
