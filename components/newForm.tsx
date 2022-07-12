import React from "react";
import BasicButton from "../components/atoms/basicButton";
import { getPlants, getPlant, addPlant } from "../data/plants";
import { useState } from "react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { getRandomEmoji } from "../data/randomEmoji";

export default function NewForm({ setPlants, setNewFormOpen }) {
  //state for emoji
  const [emoji, setEmoji] = useState("🌱");

  const handleEmojiClick = (e) => {
    e.preventDefault();
    const iv = setInterval(() => {
      setEmoji(getRandomEmoji("Animals & Nature", "plant-flower"));
    }, 90);

    return setTimeout(() => {
      clearInterval(iv);
    }, 1800);
    // setEmoji(getRandomEmoji('Animals & Nature'));
  };

  //handle emoji change
  const handleEmojiChange = (e) => {
    //animate when value updates
    setEmoji(e.target.value);
  };

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
      id: nickname,
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "linear", duration: 0.1 }}
        exit={{ opacity: 0 }}
        className="fixed z-20 top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 flex items-center justify-center bg-slate-900 bg-opacity-0 backdrop-blur-sm text-slate-700 w-full h-full transition-all"
      >
        <motion.form
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 200, mass: 1 }}
          exit={{ y: -50 }}
          className="add relative flex flex-col gap-4 bg-[#e7f9ec] p-8 rounded-lg"
          onSubmit={handleSubmit}
        >
          <button onClick={handleClose} className="absolute top-3 right-4">
            X
          </button>
          <div className="flex flex-col justify-center items-center gap-1">
            <div className="flex flex-row gap-4" onClick={handleEmojiClick}>
              <motion.button
                id="emoji-button"
                className=""
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 500, mass: 0.7 }}
              >
                <input
                  disabled
                  required
                  maxLength={1}
                  type="text"
                  name="icon"
                  className="text-4xl w-16 h-16 text-center shrink rounded-full  shadow-lg bg-white placeholder-monstera-400 placeholder-opacity-60 border-[1px] border-[#ccebd7] text-green-900 outline-[#5bb98c] outline-2 focus:outline focus:border-[#e7f9ec] cursor-pointer pointer-events-none"
                  value={emoji}
                  onChange={handleEmojiChange}
                />
              </motion.button>
            </div>
          </div>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="nickname" className="text-sm text-green-900">
              Nickname:
            </label>
            <input
              placeholder="Mike"
              required
              type="text"
              name="nickname"
              className="rounded-md px-2 py-1 bg-[#e7f9ec] placeholder-monstera-400 placeholder-opacity-60 border-[1px] border-[#ccebd7] text-green-900 outline-[#5bb98c] outline-2 focus:outline focus:border-[#e7f9ec]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="commonName" className="text-sm text-green-900">
              Type of Plant:
            </label>
            <input
              placeholder="e.g. Monstera"
              required
              type="text"
              name="commonName"
              className="rounded-md px-2 py-1 bg-[#e7f9ec] placeholder-monstera-400 placeholder-opacity-60 border-[1px] border-[#ccebd7] text-green-900 outline-[#5bb98c] outline-2 focus:outline focus:border-[#e7f9ec]"
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
