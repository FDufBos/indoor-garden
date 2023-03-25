import { Box, Input, Spinner, Tooltip } from "@chakra-ui/react";
import { Plant } from "@main/common-types/plant";
import { useFirestoreQuery } from "@main/data-models";
import useFormContext from "@main/hooks/useFormContext";
import { useRouter } from "next/router";
import React from "react";

/**
 * Props for the AddPlantName component
 */
interface AddPlantNameProps {
  /**
   * Event handler for the "Next" button's onClick event
   */
  onNextButtonClick: () => void;
}

const AddPlantName: React.FC<AddPlantNameProps> = ({ onNextButtonClick }) => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, error } = useFirestoreQuery<Plant>(`plants/`);

  const { formData, handleChange } = useFormContext();

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
        {/* Display the emoji corresponding to the plant */}
        <div className="">
          {data &&
            data
              .filter((plant) => plant.id === id)
              .map((plant, index) => (
                <span key={index} className="text-[64px]">
                  {plant.emoji}
                </span>
              ))}
        </div>
        {data &&
          data
            .filter((plant) => plant.id === id)
            .map((plant, index) => (
              <h2 key={index} className="text-[20px] text-[#32695F]">
                Name your {plant.commonName[0]}
              </h2>
            ))}
      </section>
      <section className="w-full md:w-1/4">
        <Input
          placeholder="Claude"
          variant="flushed"
          borderColor="#32695F"
          fontSize="16px"
          _placeholder={{ color: "#32695F", opacity: "0.5" }}
          type="text"
          name="nickname"
          onChange={handleChange}
          value={formData.nickname}
        />
      </section>
      <section className="fixed bottom-safe min-w-1/2 w-[342px] md:pb-[80px]">
        <Tooltip
          label="Please enter a name for your plant"
          aria-label="A tooltip"
          placement="top"
          hasArrow
          bg="red.500"
          color="white"
          openDelay={600}
          visibility={formData.nickname ? "hidden" : "visible"}
        >
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
            opacity={formData.nickname ? "1" : "0.4"}
            bg="#ffffff"
            color="#606F73"
            _hover={
              formData.nickname
                ? { background: "#fcfcfc", transform: "scale(1.0)" }
                : {}
            }
            _active={
              formData.nickname
                ? {
                    bg: "#ffffff",
                    transform: "scale(0.98)",
                    borderColor: "#bec3c9",
                  }
                : {}
            }
            _focus={
              formData.nickname
                ? {
                    boxShadow:
                      "0 0 1px 1px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                  }
                : {}
            }
            onClick={formData.nickname ? onNextButtonClick : () => null}
          >
            Next
          </Box>
        </Tooltip>
        <Box
          className="tracking-tight font-[500]"
          as="button"
          lineHeight="1.2"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          py="11px"
          width="100%"
          borderRadius="999px"
          fontSize="16px"
          fontWeight="500"
          color="#606F73"
          _hover={{ textDecoration: "underline" }}
          _active={{
            transform: "scale(0.85)",
            borderColor: "#bec3c9",
          }}
          _focus={{}}
        >
          Skip
        </Box>
      </section>
    </div>
  );
};

export default AddPlantName;
