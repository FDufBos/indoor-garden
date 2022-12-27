import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { Plant } from "@main/common-types";
import Link from "next/link";

export const CodexPage: React.FC<Plant> = ({
  botanicalName,
  commonName,
  soilType,
  toxicity,
  // sunExposure,
  hardinessZones,
  soilPh,
  nativeAreas,
  matureSize,
  // baseDaysBetweenWatering,
  id,
  bloomTime,
}) => (
  <div className="bg-monstera-100 min-h-screen">
    <nav className="flex justify-between py-[18px] mx-[24px] items-center">
      <Link href="/codex" passHref>
        <ChevronLeftIcon
          color="green.900"
          className="text-3xl cursor-pointer"
        />
      </Link>
      <h1 className="font-flexa font-[400] text-[22px] tracking-tight leading-[26px] text-center text-monstera-700">
        {commonName[0]}
      </h1>
      <div className="relative h-[36px] w-[36px] bg-monstera-700 rounded-full">
        <div className="absolute h-[24px] w-[24px] border-[2px] border-white rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20px]">
            +
          </div>
        </div>
      </div>
    </nav>
    <main>
      <section
        id="plant-photographs"
        className="min-h-[215px] h-[32vw] flex w-full"
      >
        <div className="flex flex-col justify-center items-center w-full bg-sun-400 border border-y-black" />
      </section>
      <section className="grid grid-cols-5 grid-rows-[48px_36px_40px_36px_40px] gap-0 leading-[16px]">
        <div className="flex justify-center items-center border-b border-black col-span-full font-alpina italic text-[16px] tracking-tight">
          {botanicalName}
        </div>
        <div className="flex  border-r border-b border-black text-[18px] font-[500] italic font-alpina items-center pl-2">
          Light
        </div>
        <div className="flex border-r border-b border-black text-[18px] font-[500] italic font-alpina items-center pl-2">
          Water
        </div>
        <div className="flex col-span-3 border-b border-black text-[18px] font-[500] italic font-alpina items-center pl-2">
          Soil
        </div>
        <div className="flex bg-yellow-300  col-span-1 row-span-3 border-b border-r border-black items-center pl-2" />
        <div className="flex bg-[#5caebf] col-span-1 row-span-3 border-b border-r border-black items-center pl-2" />
        <div className="flex bg-gray-300 col-span-3 border-b border-black items-center pl-2 text-[14px] font-[500]">
          {soilType}
        </div>
        <div className="flex col-span-1 border-b border-r border-black text-[18px] font-[500] italic font-alpina items-center pl-2">
          Zones
        </div>
        <div className="flex col-span-2 border-b border-black text-[18px] font-[500] italic items-center pl-2 font-alpina">
          Mature Size
        </div>
        <div className="flex bg-gray-300 col-span-1 border-b border-r border-black items-center pl-2 text-[14px] font-[500]">
          {hardinessZones}
        </div>
        <div className="flex bg-gray-300 col-span-2 border-b border-black items-center pl-2 text-[14px] font-[500]">
          {matureSize}
        </div>
      </section>
      <section className="relative -top-[8px] flex flex-col gap-[8px] m-[24px]">
        <h2 className="relative top-[16px] font-alpina font-[500] text-[18px]">
          Fact Sheet
        </h2>
        <div className="flex items-center w-full">
          <div className="grow h-[1px] bg-black w-24" />
          <div className=" text-xs pl-2 text-gray-600 font-alpina underline cursor-pointer">
            Feedback
          </div>
        </div>
        <h4 className="text-xs font-bold">
          NATIVE AREA:{" "}
          <span className="text-[16px] font-normal">
            {nativeAreas.map((nativeArea) => (
              <span key={nativeArea}>
                {nativeArea}
                {nativeAreas.indexOf(nativeArea) !== nativeAreas.length - 1
                  ? ", "
                  : ""}
              </span>
            ))}
          </span>
        </h4>
        {commonName.length > 1 && (
          <h4 className="text-xs font-bold">
            COMMON NAMES:{" "}
            <span className="text-[16px] font-normal">
              {commonName.map((name) => (
                <span key={name}>
                  {name}
                  {commonName.indexOf(name) !== commonName.length - 1
                    ? ", "
                    : ""}
                </span>
              ))}
            </span>
          </h4>
        )}
        {commonName.length === 1 && (
          <h4 className="text-xs font-bold">
            COMMON NAME:{" "}
            <span className="text-[16px] font-normal">
              {commonName.map((name) => (
                <span key={name}>
                  {name}
                  {commonName.indexOf(name) !== commonName.length - 1
                    ? ", "
                    : ""}
                </span>
              ))}
            </span>
          </h4>
        )}
        <h4 className="text-xs font-bold">
          BLOOM FREQUENCY:{" "}
          <span className="text-[16px] font-normal">{bloomTime}</span>
        </h4>
        <h4 className="text-xs font-bold">
          TOXICITY:{" "}
          <span className="text-[16px] font-normal">
            {toxicity || "No data available"}
          </span>
        </h4>
        <h4 className="text-xs font-bold">
          SOIL PH:{" "}
          <span className="text-[16px] font-normal">
            {soilPh || "No data available"}
          </span>
        </h4>
      </section>
      <section className="m-[24px]">
        <h2 className="font-alpina font-[500] text-[18px]">Description</h2>
        <div className="flex items-center w-full">
          <div className="grow h-[1px] bg-black w-24" />
        </div>
      </section>
      <div className="fixed right-[24px] bottom-safe">
        <Link
          href={{
            pathname: "/garden/new",
            query: { id },
          }}
          passHref
        >
          <Box
            as="button"
            lineHeight="1.2"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            border="1px solid black"
            px="16px"
            py="11px"
            borderRadius="999px"
            fontSize="16px"
            fontWeight="500"
            bg="#FEE214"
            color="#4b4f56"
            boxShadow="1px 1px 0px #000000"
            _hover={{ bg: "#FEE214" }}
            _active={{
              bg: "#FEE214",
              transform: "scale(0.98)",
              borderColor: "#bec3c9",
            }}
            _focus={{
              boxShadow:
                "0 0 1px 1px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
            }}
          >
            Add to garden
          </Box>
        </Link>
      </div>
    </main>
  </div>
);

export default CodexPage;
