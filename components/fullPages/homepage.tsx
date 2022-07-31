//IMPORTS
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

//React Imports
import React, { useEffect, useState } from "react";

//Framer Import
import { motion } from "framer-motion";

//UI Imports
import Layout from "../layout";
import PlantItem from "../atoms/plantItem";
import NewForm from "../forms/newForm";
import { useDisclosure, Button, useToast } from "@chakra-ui/react";

//Firebase Imports
import { sendEmailVerification } from "firebase/auth";
import { useUserAuth } from "../../contexts/AuthContext";


export default function Homepage() {
  //HOOKS
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [timeTillNextWater, setTimeTillNextWater] = useState();
  const [exitAnimation, setExitAnimation] = useState("exit"); 

  const {
    user,
    firestorePlants,
    documentIDs,
    setFirestorePlants,
    setDocumentIDs,
    logOut,
    hiddenAnimation,
    setHiddenAnimation,
  } = useUserAuth();

  //Framer Animation Variants
  const variants = {
    hidden: { x: "-20px", opacity: 0 },
    hiddenLeft: { x: "20px", opacity: 0 },
    enter: { x: "0px", opacity: 1 },
    exit: { x: "-100px", opacity: 0 },
    exitLeft: { x: "100px", opacity: 0 },
  };

  useEffect(() => {
    if (hiddenAnimation === "hiddenLeft"){
      setHiddenAnimation("exit");
    }
  })

  //HANDLERS
  //When user click "New Plant" button and they are not verified
  //a verification email is sent to them and they are logged out
  const handleNewFormClick = async (e) => {
    if (user.emailVerified === false) {
      await sendEmailVerification(user);
      toast({
        title: "Please verify your email",
        position: "top",
        description: "Check your email for a verification link",
        status: "error",
        duration: 6000,
        isClosable: true,
        variant: "subtle",
        containerStyle: {
          width: "95vw",
          maxWidth: "900px",
        },
      });
      logOut();
    } else {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <motion.div
      variants={variants}
      initial={hiddenAnimation}
      animate="enter"
      exit={exitAnimation}
      transition={{ type: "intertia" }}
    >
      <Layout exitAnimation={exitAnimation} setExitAnimation={setExitAnimation}>
        <div>
          <Head>
            <title>Indoor Garden</title>
            <meta name="description" content="An Indoor Garden for Ya" />
            <link rel="icon" href="/favicon.ico" />

            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#5C8B57" />
            <link rel="apple-touch-icon" href="/images/app_icons/icon.png" />
            <meta name="apple-mobile-web-app-status-bar" content="#5C8B57" />
          </Head>

          <main className="min-h-screen">
            {/* <Button
              onClick={async (e) => {
                e.preventDefault();
              }}
            >
              Order Plants
            </Button> */}
            <section className=" mx-6">
              {firestorePlants &&
                firestorePlants.map((plant, index) => (
                  <Link
                    href={`/garden/${documentIDs[index]}`}
                    key={index}
                    passHref
                    scroll={false}
                  >
                    <div className="cursor-pointer">
                      <PlantItem
                        index={index}
                        key={index}
                        icon={plant.icon}
                        name={plant.nickname}
                        commonName={plant.commonName}
                        timeTillNextWater={
                          timeTillNextWater
                            ? timeTillNextWater
                            : Math.floor(
                                (Date.now() - plant.timeLastWatered.toDate()) /
                                  (1000 * 60 * 60 * 24)
                              )
                        }
                        setTimeTillNextWater={setTimeTillNextWater}
                        wateringStreak={
                          //calculate number of days since plant was created
                          Math.floor(
                            (Date.now() - plant.timeCreated.toDate()) /
                              (1000 * 60 * 60 * 24)
                          )
                        }
                        level={plant.level}
                        timeCreated={plant.timeCreated}
                      />
                    </div>
                  </Link>
                ))}
            </section>

            <div>
              <NewForm
                isOpen={isOpen}
                onClose={onClose}
                setFirestorePlants={setFirestorePlants}
                setDocumentIDs={setDocumentIDs}
              />
            </div>

            {user && user.emailVerified ? (
              <Button onClick={handleNewFormClick} className="mx-6 mb-10">
                New Plant
              </Button>
            ) : (
              <Button onClick={handleNewFormClick} className="mx-6 mb-10">
                Verify email to add a plant
              </Button>
            )}
          </main>
        </div>
      </Layout>
    </motion.div>
  );
}
