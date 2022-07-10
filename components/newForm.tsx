import React from "react";
import BasicButton from "../components/atoms/basicButton";
import { getPlants, getPlant, addPlant } from "../data/plants";
import { useState } from "react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewForm({ setPlants, setNewFormOpen }) {
  const handleSubmit = (e: any) => {
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

    setNewFormOpen(false);

    //save new plants array to local storage
    localStorage.setItem("plants", JSON.stringify(getPlants()));
  };

  const handleClose = () => {
    setNewFormOpen(false);
  };

  return (
    <AnimatePresence>
      <motion.section
      initial={{opacity: 0}}
      animate={{opacity: 1 }}
      transition={{ease: "linear", duration: 0.1}}
      exit={{opacity: 0}}
        className="fixed z-20 top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 flex items-center justify-center bg-slate-900 bg-opacity-0 backdrop-blur-sm text-slate-700 w-full h-full transition-all"
      >
        <motion.form
          initial={{y: 50}}
          animate={{y: 0 }}
          transition={{ type: "spring", stiffness: 200, mass: 1 }}
          exit={{y: -50}}
          className="add flex flex-col gap-4 bg-slate-100 p-8 rounded-2xl"
          onSubmit={handleSubmit}
        >
          <button onClick={handleClose}>close</button>
          <div className="flex flex-col gap-1">
            <label htmlFor="nickname">Nickname:</label>
            <input
              required
              type="text"
              name="nickname"
              className="text-black rounded-md px-2 font-extralight"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="commonName">Popular Name:</label>
            <input
              required
              type="text"
              name="commonName"
              className="text-black rounded-md px-2 font-extralight"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="icon">Emoji:</label>
            <input
              required
              maxLength={2}
              type="text"
              name="icon"
              className="text-black rounded-md px-2 font-extralight"
            />
          </div>
          <button type="submit" className="max-w-fit">
            <BasicButton bgColor="bg-water-100" textColor={"red"}>
              Add new plant
            </BasicButton>
          </button>
        </motion.form>
        <br></br>
      </motion.section>
    </AnimatePresence>
  );
}
