import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Plant } from "@main/common-types";
import { useFirestoreQuery } from "@main/data-models";
import { orderBy } from "firebase/firestore";
import Link from "next/link";
import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TbChevronRight } from "react-icons/tb";

export interface SelectPlantProps {}

export const SelectPlant: React.FC<SelectPlantProps> = () => {
  const { data, isLoading, error } = useFirestoreQuery<Plant>(
    `plants`,
    orderBy("botanicalName")
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }
  return (
    <div>
      <div className="bg-monstera-100 w-full min-h-screen overflow-x-clip">
        <div className="flex justify-center w-full py-8 px-6 ">
          <InputGroup>
            <Input
              placeholder="Search for a plant..."
              variant="outline"
              focusBorderColor="green.600"
              borderColor="#5C8B57"
              bg="#E2E5DB"
              size="lg"
              borderRadius="8px"
              _placeholder={{ opacity: 1, color: "#929F90" }}
            />
            <InputRightElement>
              <IoIosCloseCircleOutline className="relative top-[4px] text-monstera-400 text-xl" />
            </InputRightElement>
          </InputGroup>
        </div>
        <div className="bg-[#F0E1E5] min-h-[196px] ml-[12px] rounded-l-xl mb-[32px]">
          <div className="p-[16px]">
            <h2 className="text-[#98A380] text-sm">Featured</h2>
            <h3 className="font-[Alpina] text-2xl text-monstera-800">
              Flowers
            </h3>
          </div>
          <div className="flex gap-[16px] ml-[12px] overflow-x-scroll pb-[12px] pr-[16px]">
            {data &&
              data.slice(0, 9).map((plant, index) => (
                <Link key={index} href={plant.id ? `/codex/${plant.id}`  : `/codex/ ${plant.botanicalName}`} passHref>
                  <div className="flex flex-col items-center gap-[8px]">
                    <div className="h-[75px] w-[75px] bg-[#FCFEF8] rounded-full text-[36px] flex items-center justify-center cursor-pointer">
                      {plant.emoji}
                    </div>

                    <p className="font-medium text-[14px] text-center cursor-pointer">
                      {plant.commonName[0]}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <div className=" h-[160px] ml-[12px] rounded-l-xl mb-[32px]">
          <div className="p-[16px]">
            <h2 className="font-[Alpina] text-2xl text-monstera-800">
              Indoor Starters
            </h2>
          </div>
          <div className="flex gap-[16px] ml-[12px]">
            <div className="flex flex-col items-center gap-[8px]">
              <div className="h-[75px] w-[75px] bg-[#FCFEF8] rounded-full text-[36px] flex items-center justify-center">
                🌵
              </div>
              <p className="font-medium text-[14px]">Cactus</p>
            </div>
            <div className="flex flex-col items-center gap-[8px]">
              <div className="h-[75px] w-[75px] bg-[#FCFEF8] rounded-full text-[36px] flex items-center justify-center">
                🌵
              </div>
              <p className="font-medium text-[14px]">Cactus</p>
            </div>
            <div className="flex flex-col items-center gap-[8px]">
              <div className="h-[75px] w-[75px] bg-[#FCFEF8] rounded-full text-[36px] flex items-center justify-center">
                🌵
              </div>
              <p className="font-medium text-[14px]">Cactus</p>
            </div>
          </div>
        </div>
        <div className=" h-[160px] ml-[12px] rounded-l-xl mb-[32px]">
          <div className="p-[16px]">
            <h2 className="font-[Alpina] text-2xl text-monstera-800">
              Popular
            </h2>
          </div>
          <div className="flex gap-[16px] ml-[12px]">
            <div className="flex flex-col items-center gap-[8px]">
              <div className="h-[75px] w-[75px] bg-[#FCFEF8] rounded-full text-[36px] flex items-center justify-center">
                🌷
              </div>
              <p className="font-medium text-[14px]">Tulips</p>
            </div>
            <div className="flex flex-col items-center gap-[8px]">
              <div className="h-[75px] w-[75px] bg-[#FCFEF8] rounded-full text-[36px] flex items-center justify-center">
                🌷
              </div>
              <p className="font-medium text-[14px]">Tulips</p>
            </div>
            <div className="flex flex-col items-center gap-[8px]">
              <div className="h-[75px] w-[75px] bg-[#FCFEF8] rounded-full text-[36px] flex items-center justify-center">
                🌷
              </div>
              <p className="font-medium text-[14px]">Tulips</p>
            </div>
          </div>
        </div>
        <div className="flex ml-[16px] p-[16px]">
          <h2 className="font-[Alpina] text-2xl text-monstera-800">
            Browse All
          </h2>
          <TbChevronRight className="relative top-1.5 text-xl" />
        </div>
      </div>
    </div>
  );
};
export default SelectPlant;
