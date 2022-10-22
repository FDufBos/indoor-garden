import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Plant } from "@main/common-types";
import Link from "next/link";

export const CodexPage: React.FC<Plant> = ({
  botanicalName,
  commonName,
  emoji,
  soilType,
  toxicity,
}) => (
  <div className="bg-monstera-100 min-h-screen">
    <nav className="flex justify-between py-[18px] mx-[24px] items-center">
      <Link href="/codex" passHref>
        <ChevronLeftIcon
          color="green.700"
          className="text-4xl cursor-pointer"
        />
      </Link>
      <h1 className="font-[Flexa] font-[500] text-[20px] -letter-spacing-[1%] text-center text-monstera-700">
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
    <section
      id="plant-photographs"
      className="min-h-[215px] h-[32vw] flex w-full"
    >
      <div className="bg-[#bbe8ef] w-1/2" />
      <div className="bg-[#f3d3e2] w-1/2 flex-col">
        <div className="bg-[#dcf3ff] h-1/2" />
        <div className="bg-[#f3d3e2]  h-1/2" />
      </div>
    </section>
    <h2 className=" text-center relative -top-[64px] text-[80px]">{emoji}</h2>
    <h3 className=" text-center relative -top-[80px] text-[14px] text-monstera-700 font-[400] opacity-[85%]">
      {botanicalName}
    </h3>
    <main className="relative -top-[56px]">
      <section className="flex justify-between min-h-[72px] gap-[8px] mx-[24px] text-monstera-700">
        <div className="w-full rounded-[16px] border-monstera-700 bg-opacity-60 border shadow-sm p-[8px] flex flex-col gap-[8px] justify-between">
          <h3 className="font-bold  text-[14px] pl-[4px]">SOIL</h3>
          {/* eslint-disable-next-line max-len */}
          <h3 className="flex border-monstera-700 items-center justify-start h-full text-[14px] leading-tighter border shadow-sm rounded-[12px] px-[8px] py-[4px] leading-4 tracking-tight">
            {soilType}
          </h3>
        </div>
        <div className="w-full rounded-[16px] border-monstera-700  bg-opacity-60 border shadow-sm p-[8px] flex flex-col gap-[8px] justify-between">
          <h3 className="font-bold text-[14px] pl-[4px]">TOXICITY</h3>
          {/* eslint-disable-next-line max-len */}
          <h3 className="flex border-monstera-700 items-center justify-start h-full text-[14px] leading-tighter border shadow-sm rounded-[12px] px-[8px] py-[6px] leading-4 tracking-tight">
            {toxicity || "Unknown"}
          </h3>
        </div>
        {/* eslint-disable-next-line max-len */}
        <div className="w-full rounded-[16px] max-w-[64px] border-monstera-700 bg-opacity-60 border shadow-sm p-[8px] flex flex-col gap-[8px] justify-between">
          <h3 className="font-bold text-[14px] leading-tighter pl-[4px]">
            TYPE
          </h3>
          {/* eslint-disable-next-line max-len */}
          <div className="border-monstera-700 flex items-center justify-center h-full text-center text-xl border shadow-sm rounded-[12px] px-[8px] py-[6px] leading-4 tracking-tight">
            <h3 className="relative top-[1px]">😇</h3>
          </div>
        </div>
      </section>
      <section className="my-[32px]">
        <div
          id="water-slider"
          className="relative h-[10px] border border-blue-300 mx-[24px] rounded-full z-50"
        >
          <div className="relative top-5">
            <div className="absolute left-0 font-medium text-blue-400 text-[12px] opacity-75 translate-x-1/5">
              1
            </div>
            <div className="absolute left-[75%] -translate-x-1/2 font-semibold text-blue-600">
              7
            </div>
            <div className="absolute right-0 font-medium text-blue-400 text-[12px] opacity-75 -translate-x-1/5">
              90+
            </div>
          </div>
          <div className="z-40">
            <div className="absolute bg-blue-400 left-1/4 w-[1px] h-[8px]" />
            <div className="absolute bg-blue-400 left-2/4 w-[1px] h-[8px]" />
            <div className="absolute bg-blue-400 left-3/4 w-[1px] h-[8px]" />
          </div>
          <div>
            <div className="absolute -translate-y-1/2 top-1/2 left-0 w-[75%] h-2 bg-blue-200 rounded-full z-0" />
            {/* eslint-disable-next-line max-len */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-[75%] h-[30px] w-[30px] rounded-full border-slate-700 border-1 bg-white shadow-[1.21429px_1.21429px_12.1429px_rgba(0, 0, 0, 0.14);]">
              <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 mt-[1px] left-1/2 text-[20px]">
                💧
              </div>
            </div>
          </div>
        </div>
        <div
          id="sunlight-slider"
          className="relative h-[10px] border border-amber-300 mx-[24px] mt-[64px] rounded-full"
        >
          <div className="relative top-5">
            <div className="absolute left-0 font-medium text-amber-500 text-[12px] opacity-75 translate-x-1/5">
              DARK
            </div>
            <div className="absolute left-[55%] -translate-x-1/2 font-semibold text-amber-700">
              Indirect
            </div>
            <div className="absolute right-0 font-medium text-amber-500 text-[12px] opacity-75 -translate-x-1/5">
              DIRECT
            </div>
          </div>
          <div>
            <div className="absolute bg-amber-300 left-1/4 w-[1px] h-[8px]" />
            <div className="absolute bg-amber-300 left-2/4 w-[1px] h-[8px]" />
            <div className="absolute bg-amber-300 left-3/4 w-[1px] h-[8px]" />
          </div>
          <div>
            <div className="absolute -translate-y-1/2 top-1/2 left-0 w-[55%] h-2 bg-amber-100 rounded-full" />
            {/* eslint-disable-next-line max-len */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-[55%] h-[30px] w-[30px] rounded-full bg-[#FCFEF8] shadow-[1.21429px_1.21429px_12.1429px_rgba(0, 0, 0, 0.14);]">
              <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 mt-[1px] left-1/2 text-[20px]">
                🌞
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="p-[24px] mt-[32px]">
        <h3 className="text-monstera-700 font-[Alpina] text-[18px] font-bold">
          Description
        </h3>
        <hr className="mt-[4px] border-monstera-700" />
        <p className="text-monstera-700 mt-[8px] tracking-tight leading-[133.5%]">
          {toxicity}
        </p>
      </section>
    </main>
  </div>
);

export default CodexPage;
