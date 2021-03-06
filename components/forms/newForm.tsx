import React from "react";
import { addPlant, fetchPlants, fetchIDs } from "../../data/firestore";
import { serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";

import { getRandomEmoji } from "../../data/randomEmoji";
import { getAuth } from "firebase/auth";
import { useUserAuth } from "../../contexts/AuthContext";

const auth = getAuth();

export default function NewForm({
  isOpen,
  onClose,
  setFirestorePlants,
  setDocumentIDs,
}) {
  //state for emoji
  const [emoji, setEmoji] = useState("🌱");

  const { codex } = useUserAuth();

  const handleEmojiClick = (e) => {
    e.preventDefault();
    const iv = setInterval(() => {
      setEmoji(getRandomEmoji("Animals & Nature", "plant-flower"));
    }, 90);
    return setTimeout(() => {
      clearInterval(iv);
    }, 1800);
  };

  //handle emoji change
  const handleEmojiChange = (e) => {
    //animate when value updates
    e.preventDefault();
    setEmoji(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const user = auth.currentUser;
    const uid = user.uid;
    //Capitalize first letters
    function capitalizeFirstLetter(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //get values from the form and save them in variables
    const commonName = capitalizeFirstLetter(
      e.currentTarget.elements.commonName.value
    );
    const nickname = capitalizeFirstLetter(
      e.currentTarget.elements.nickname.value
    );
    const icon = e.currentTarget.elements.icon.value;

    const timestamp = serverTimestamp();
    // console.log(timestamp);

    await addPlant(
      {
        icon: icon,
        commonName: commonName,
        nickname: nickname,
        timeTillNextWater: 0,
        wateringStreak: 0,
        level: 1,
        timeCreated: timestamp,
        timeLastWatered: timestamp,
      },
      uid
    ).then(() => {
      // console.log("plant added");
      //update firestorePlants state with new plant
      fetchPlants(uid).then((data) => {
        setFirestorePlants(data);
      });
      //update documentIDs to reflex new plant
      fetchIDs(uid).then((data) => {
        setDocumentIDs(data);
      });
    });
    onClose();
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(20px)" bg="blackAlpha.100" />
        <ModalContent bg="#e7f9ec" borderRadius="xl" p={4}>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody display="flex" flexDirection="column" gap="16px">
              <FormControl className="flex flex-col justify-center items-center gap-1">
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
                      type="button"
                      name="icon"
                      className="text-4xl w-16 h-16 text-center shrink rounded-full  shadow-lg bg-white placeholder-monstera-400 placeholder-opacity-60 border-[1px] border-[#ccebd7] text-green-900 outline-[#5bb98c] outline-2 focus:outline focus:border-[#e7f9ec] cursor-pointer pointer-events-none"
                      value={emoji}
                      onChange={handleEmojiChange}
                    />
                  </motion.button>
                </div>
              </FormControl>
              <FormControl className="flex flex-col gap-1 ">
                <FormLabel
                  htmlFor="nickname"
                  className="text-sm text-green-900"
                >
                  Nickname:
                </FormLabel>
                <Input
                  placeholder="Mike"
                  required
                  type="text"
                  name="nickname"
                  className="rounded-md px-2 py-1 bg-[#e7f9ec] placeholder-monstera-400 placeholder-opacity-60 border-[1px] border-[#ccebd7] text-green-900 outline-[#5bb98c] outline-2 focus:outline focus:border-[#e7f9ec]"
                />
              </FormControl>
              <FormControl className="flex flex-col gap-1">
                <FormLabel
                  htmlFor="commonName"
                  className="text-sm text-green-900"
                >
                  Type of Plant:
                </FormLabel>
                <Select name="commonName">
                  {codex &&
                    codex.map((item, index) => {
                      return (
                        <option key={index} value={item.commonName[0]}>
                          {item.commonName[0]}
                        </option>
                      );
                    })}
                </Select>
              </FormControl>
            </ModalBody>
            <ModalFooter
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Button type="submit" colorScheme="green">
                Add new Plant
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}
