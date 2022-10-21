import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Plant } from "@main/common-types";
import Link from "next/link";


export const CodexPage: React.FC<Plant> = ({
  botanicalName,
  commonName,
  emoji,
  id,
  soilType,
  toxicity,
}) => (
  <div>
    <nav className="flex justify-between my-[18px] mx-[24px] items-center">
      <Link href="/codex" passHref>
        <ChevronLeftIcon color="white" className="text-3xl cursor-pointer" />
      </Link>
      <h1 className="font-[Flexa] font-medium text-[24px] -letter-spacing-[1%] text-center">{commonName[0]}</h1>
      <div className="relative h-[36px] w-[36px] bg-white rounded-full">
        <div className="absolute h-[24px] w-[24px] border-[2px] border-monstera-800 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="text-monstera-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20px]">+</div>
        </div>
      </div>
    </nav>
    <section id="plant-photographs" className="min-h-[215px] h-[32vw] flex w-full">
      <div className="bg-[#bbe8ef] w-1/2" />
      <div className="bg-[#f3d3e2] w-1/2 flex-col">
        <div className="bg-[#dcf3ff] h-1/2" />
        <div className="bg-[#f3d3e2]  h-1/2" />
      </div>
    </section>
    <section className="text-[64px]">
      <h2 className=" text-center relative -top-[48px]">{emoji}</h2>
      <div className="flex justify-between min-h-[72px] gap-[8px] mx-[24px] text-[#FFB800]">
        <div className="w-full rounded-[16px] border border-[#FFB800] p-[8px]">
          <h3 className="font-bold text-[14px]">SOIL</h3>
          <h3 className="text-[16px] border border-[#FFB800] rounded-[12px] px-[8px] py-[4px]">{soilType}</h3>
        </div>
        <div className="w-full rounded-[16px] border border-[#FFB800] p-[8px]">
          <h3 className="font-bold text-[14px]">TOXICITY</h3>
          <h3 className="text-[16px] border border-[#FFB800] rounded-[12px] px-[8px] py-[4px]">{toxicity || "Unknown"}</h3>
        </div>
        <div className="w-full rounded-[16px] border border-[#FFB800] p-[8px]">
          <h3 className="font-bold text-[14px]">TYPE</h3>
          <h3 className="text-[16px] border border-[#FFB800] rounded-[12px] px-[8px] py-[4px]">😇</h3>
        </div>
      </div>
    </section>
    <h1>{botanicalName}</h1>
    <h2>{commonName}</h2>
    <h2>{emoji}</h2>
    <h2>{id}</h2>
  </div>
);

export default CodexPage;
