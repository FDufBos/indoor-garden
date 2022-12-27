// IMPORTS
import { Button, Spinner, useToast } from "@chakra-ui/react";
import { GardenItem } from "@main/common-types";
import { useFirestoreQuery } from "@main/data-models";
// Firebase Imports
import { sendEmailVerification } from "firebase/auth";
import { orderBy } from "firebase/firestore";
// Framer Import
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
// React Imports
import React, { useEffect, useState } from "react";

import { useUserAuth } from "../../contexts/AuthContext";
import PlantItem from "../atoms/plantItem";
// UI Imports
import Layout from "../layout";

/**
 *
 */
export const Homepage: React.FC = () => {
  // HOOKS
  const toast = useToast();
  const [timeTillNextWater, setTimeTillNextWater] = useState();
  const [exitAnimation, setExitAnimation] = useState("exit");
  const router = useRouter();
  const { user, documentIDs, logOut, hiddenAnimation, setHiddenAnimation } =
    useUserAuth();

  const { data, isLoading, error } = useFirestoreQuery<GardenItem>(
    `users/${user.uid}/garden`,
    orderBy("timeCreated")
  );

  // Framer Animation Variants
  const variants = {
    hidden: { x: "-30%", opacity: 0 },
    hiddenLeft: { x: "30%", opacity: 0 },
    enter: {
      x: "0px",
      opacity: 1,
      transition: { ease: "circOut", duration: 0.3 },
    },
    exit: {
      x: "-20%",
      opacity: 0,
      transition: { ease: "easeIn", duration: 0.3 },
    },
    exitLeft: {
      x: "20%",
      opacity: 0,
      transition: { ease: "easeIn", duration: 0.3 },
    },
  };

  useEffect(() => {
    if (hiddenAnimation === "hiddenLeft") {
      setHiddenAnimation("exit");
    }
  });

  // HANDLERS
  // When user click "New Plant" button and they are not verified
  // a verification email is sent to them and they are logged out
  const handleNewFormClick = async (e): Promise<void> => {
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
      router.push("/codex");
    }
  };

  if (isLoading) {
    return (
      <div className="fixed flex justify-center items-center w-screen h-screen">
        <Spinner color="#ffffff" className="relative bottom-[96px] " />
      </div>
    );
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <motion.div
      variants={variants}
      initial={hiddenAnimation}
      animate="enter"
      exit={exitAnimation}
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

          <main className="h-full">
            {/* <Button
              onClick={async (e) => {
                e.preventDefault();
              }}
            >
              Order Plants
            </Button> */}
            <section className=" mx-6">
              {data &&
                data.map((plant, index) => (
                  <Link
                    href={`/garden/${documentIDs[index]}`}
                    key={index}
                    passHref
                    scroll={false}
                  >
                    <div className="cursor-pointer">
                      <PlantItem
                        index={`${index}`}
                        key={index}
                        timeTillNextWater={
                          timeTillNextWater ||
                          Math.floor(
                            (Date.now().valueOf() -
                              plant.timeLastWatered.toDate().valueOf()) /
                              (1000 * 60 * 60 * 24)
                          )
                        }
                        setTimeTillNextWater={setTimeTillNextWater}
                        wateringStreak={
                          // calculate number of days since plant was created
                          Math.floor(
                            (Date.now().valueOf() -
                              plant.timeCreated.toDate().valueOf()) /
                              (1000 * 60 * 60 * 24)
                          )
                        }
                        level={plant.level}
                        timeCreated={plant.timeCreated}
                        {...plant}
                      />
                    </div>
                  </Link>
                ))}
            </section>

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
};
export default Homepage;
