import Image from "next/image";
import React from "react";
import { render } from "react-dom";
import { useState } from "react";

export default function Layout({ children}) {

  const [newPlantModalOpen, setnewPlantModalOpen] = useState(false);
  const plantList: object[] = [];
  const [plants, setPlants] = useState(plantList);

  const handleClick = () => {
    //when the user clicks the button, set the state of newPlantModalOpen to true
    setnewPlantModalOpen(true);
    //set the state of newPlantModalOpen to false after the modal is closed
  };
  
  return (
    <div className=" text-white">
      <header className="flex flex-col gap-4 mt-4 mx-6">
        <nav
          id="explore"
          className=" flex flex-row justify-between items-center h-[40px] w-full"
        >
          <div
            id="profile-pic"
            className="bg-monstera-200 drop-shadow-sm w-[40px] h-[40px] flex justify-center items-center rounded-full"
          >
            <Image
              src="/images/memoji/male-1.png"
              width="30"
              height="30"
              className="drop-shadow"
            />
          </div>
          <div className="flex flex-row gap-4">
            <div
              id="exchange-button"
              className="bg-white drop-shadow-sm rounded-full text-grey-600 px-4 py-2 text-center font-[558] hover:scale-110 transition-all"
            >
              🌱 Exchange
            </div>
            </div>
        </nav>
        <div
          id="title-area"
          className="flex flex-row justify-between items-end w-full"
        >
          <div className="flex flex-row items-baseline gap-3">
            <h1 className="font-alpina">Indoor Garden</h1>
          </div>
          <Image src="/images/sun.svg" width="35" height="35" />
        </div>
        <div className="line w-full h-[1px] bg-white opacity-75 -translate-y-2 mb-4"></div>
      </header>
      {children}
      <footer className="flex flex-col justify-center items-center">
        <div className="line w-full h-[1px] bg-white opacity-75 -translate-y-1"></div>
        👀👀
      </footer>
    </div>
  );
}
