import React from "react";
import { useState } from "react";
import BasicButton from "../components/atoms/basicButton";
import { getPlants, getPlant, addPlant } from "../data/plants";

export default function NewForm({ setPlants }) {
  //handlesubmit of common name form
  const handleSubmit = (e:any) => {
    function capitalizeFirstLetter(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    e.preventDefault();
    const commonName = capitalizeFirstLetter(
      e.currentTarget.elements.commonName.value
    );
    const nickname = capitalizeFirstLetter(
      e.currentTarget.elements.nickname.value
    );
    const icon = e.currentTarget.elements.icon.value;

    addPlant({
      icon: icon,
      commonName: commonName,
      nickname: nickname,
      timeTillNextWater: 0,
      wateringStreak: 0,
      level: 1,
    });
    //reset form
    e.currentTarget.reset();

    console.log(getPlants());

    //display new plants

    setPlants([getPlants()]);

    //save new plants array to local storage
    localStorage.setItem("plants", JSON.stringify(getPlants()));
  };
  return (
    <section className="mx-6 w-1/2">
      <form className="add flex flex-col gap-2" onSubmit={handleSubmit}>
        <label htmlFor="nickname">Nickname:</label>
        <input
          type="text"
          name="nickname"
          className="text-black rounded-md px-2 font-extralight"
        />
        <label htmlFor="commonName">Popular Name:</label>
        <input
          type="text"
          name="commonName"
          className="text-black rounded-md px-2 font-extralight"
        />
        <label htmlFor="icon">Emoji:</label>
        <input
          maxLength={2}
          type="text"
          name="icon"
          className="text-black rounded-md px-2 font-extralight"
        />

        <button type="submit" className="">
          <BasicButton bgColor="bg-water-100" textColor={"red"}>
            Add new plant
          </BasicButton>
        </button>
      </form>
      <br></br>
    </section>
  );
}
