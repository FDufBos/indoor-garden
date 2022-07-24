import React from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { deletePlant } from "../data/firestore";

import { ChevronLeftIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
  Tooltip,
} from "@chakra-ui/react";

import { useUserAuth } from "../contexts/AuthContext";

// const auth = getAuth()

export default function PlantPage({
  nickname,
  commonName,
  icon,
  level,
  timeTillNextWater,
  wateringStreak,
}) {
  const { user } = useUserAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  const handleHomeClick = (e) => {
    e.preventDefault();
    Router.push("/");
  };

  const handleMoreClick = (e) => {
    e.preventDefault();
    deletePlant(router.query.name, user);
    Router.push("/");
  };

  return (
    <div>
      <Head>
        <title>{nickname} | Indoor Garden</title>
        <meta name="description" content="An Indoor Garden for Ya" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#5C8B57" />
        <link rel="apple-touch-icon" href="/images/app_icons/icon.png" />
        <meta name="apple-mobile-web-app-status-bar" content="#5C8B57" />
      </Head>

      <nav className="flex justify-between mx-6 py-6">
        <button onClick={handleHomeClick}>
          <ChevronLeftIcon boxSize="2rem" focusable={true} color="white" />
        </button>
        <button onClick={onOpen}>
          <Tooltip label='Delete'>
            <CloseIcon boxSize="1rem" focusable={true} color="white" />
          </Tooltip>
        </button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalHeader>Delete Plant</ModalHeader>
            <ModalBody>Are you sure you want to delete this plant?</ModalBody>
            <ModalFooter className="flex gap-1">
              
              <Button onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  deletePlant(router.query.name, user.uid);
                  Router.push("/");
                }}
                colorScheme="red"
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </nav>

      <header
        id="plant-info"
        className="relative bottom-4 flex mx-6 flex-col gap-3 justify-between items-center mb-6"
      >
        <div
          id="image-circle"
          className="bg-white relative w-20 h-20 rounded-full drop-shadow flex flex-col justify-center items-center"
        >
          <div id="plant-image" className="text-5xl text-center">
            {icon}
          </div>
          <div
            id="image-label"
            className="absolute bottom-0 right-0 flex items-center justify-center bg-water-100 h-8 w-8 rounded-full drop-shadow text-grey-600 font-[690]"
          >
            {level}
          </div>
        </div>
        <div id="titles" className="flex flex-col items-center">
          <h1 className="font-flexa">{nickname}</h1>
          <h2 className="text-white">{commonName}</h2>
        </div>
        <div className="flex flex-col items-center text-water-100 gap-0">
          <div>💧 Water in {timeTillNextWater} days</div>
          <div>🔥 Streak is {wateringStreak} days long</div>
        </div>
        <div
          id="plant-properties"
          className="flex text-sm gap-2 w-full mt-2 text-center"
        >
          <div className=" bg-indigo-100 text-indigo-600 rounded-md w-full py-[1px] text-md">
            Living Room
          </div>
          <div className="bg-sun-100 text-amber-600 rounded-md w-full py-[1px] text-md">
            Sun Lover
          </div>
          <div className="bg-sky-100 text-sky-600 rounded-md w-full py-[1px] text-md">
            Water Lover
          </div>
        </div>
      </header>
      <section id="memory-lane" className="flex flex-col gap-1 mx-6">
        <div
          id="above-the-divider"
          className="flex justify-between items-baseline"
        >
          <h1>Memory Lane</h1>
          <h2 className="text-water-100 font-alpina">View More</h2>
        </div>
        <hr />
        <div
          id="recent-plant-pics"
          className="mt-2 h-24 flex gap-4 justify-between"
        >
          <div className="w-full rounded-md bg-slate-400"></div>
          <div className="w-full rounded-md bg-slate-400"></div>
          <div className="w-full rounded-md bg-slate-400"></div>
          <div className="w-full rounded-md bg-slate-400"></div>
        </div>
      </section>
      <section
        id="codex"
        className="bg-white h-96  mt-8 mx-2 px-4 pt-4 rounded-xl rounded-b-none"
      >
        <h1 className="text-monstera-400">Codex</h1>
        <hr className="bg-monstera-400 h-[3px] " />
      </section>
    </div>
  );
}
