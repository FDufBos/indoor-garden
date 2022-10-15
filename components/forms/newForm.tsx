import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { useFirestoreMutation } from "@main/data-models";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import React, { useState } from "react";

import { useUserAuth } from "../../contexts/AuthContext";
import { getRandomEmoji } from "../../data/randomEmoji";

export interface NewFormProps {
  /** If the form is open */
  isOpen: boolean;
  /** On form close */
  onClose: () => void;
}

export const NewForm: React.FC<NewFormProps> = ({ isOpen, onClose }) => {
  // state for emoji
  const [emoji, setEmoji] = useState("🌱");

  const { user, codex } = useUserAuth();

  const { mutate, isLoading, error } = useFirestoreMutation(
    `users/${user.uid}/garden`,
    addDoc
  );

  const handleEmojiClick = (e): NodeJS.Timeout => {
    e.preventDefault();
    const iv = setInterval(() => {
      setEmoji(getRandomEmoji("Animals & Nature", "plant-flower"));
    }, 90);
    return setTimeout(() => {
      clearInterval(iv);
    }, 1800);
  };

  // handle emoji change
  const handleEmojiChange = (e): void => {
    // animate when value updates
    e.preventDefault();
    setEmoji(e.target.value);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(20px)" bg="blackAlpha.100" />
        <ModalContent bg="#e7f9ec" borderRadius="xl" p={4}>
          <ModalCloseButton />
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
              // Capitalize first letters
              const capitalizeFirstLetter = (string: string): string =>
                string.charAt(0).toUpperCase() + string.slice(1);

              const timestamp = serverTimestamp();
              // console.log(timestamp);

              mutate({
                icon: e.currentTarget.elements.icon.value,
                commonName: capitalizeFirstLetter(
                  e.currentTarget.elements.commonName.value
                ),
                nickname: capitalizeFirstLetter(
                  e.currentTarget.elements.nickname.value
                ),
                timeTillNextWater: 0,
                wateringStreak: 0,
                level: 1,
                timeCreated: timestamp,
                timeLastWatered: timestamp,
              });
              onClose();
            }}
          >
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
                      // eslint-disable-next-line max-len
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
                  // eslint-disable-next-line max-len
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
                    codex.map((item, index) => (
                      <option key={index} value={item.commonName[0]}>
                        {item.commonName[0]}
                      </option>
                    ))}
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
};
export default NewForm;
