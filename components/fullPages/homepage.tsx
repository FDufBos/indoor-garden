// IMPORTS
import { ArrowDownIcon } from "@chakra-ui/icons";
import { Button, Spinner, useToast } from "@chakra-ui/react";
import { GardenItem, Plant } from "@main/common-types";
import PlantItem from "@main/components/atoms/plantItem";
import { useUserAuth } from "@main/contexts/AuthContext";
import {
  useFirestoreQuery,
} from "@main/data-models";
import { db } from "@main/utils/firebaseUtils";
// Firebase Imports
import { sendEmailVerification } from "firebase/auth";
import { doc, orderBy, serverTimestamp, updateDoc } from "firebase/firestore";
// Framer Import
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
// React Imports
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";

// UI Imports
import Layout from "../layout";

/**
 *
 */
export const Homepage: React.FC = ({  }) => {
  // HOOKS
  const toast = useToast();
  const [exitAnimation, setExitAnimation] = useState("exit");
  const router = useRouter();
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("asc");
  // const [orderField, setOrderField] = useState<"timeCreated" | "nickname">("timeCreated");
  const [rotationAngle, setRotationAngle] = useState(0);

  const { user, documentIDs, logOut, hiddenAnimation, setHiddenAnimation } =
    useUserAuth();

  const { data, isLoading, error } = useFirestoreQuery<GardenItem>(
    `users/${user.uid}/garden`,
    orderBy("timeCreated", `${orderDirection}`)
  );

  // Query the /plants collection
  const {
    data: codexData,
    isLoading: codexLoading,
    error: codexError,
  } = useFirestoreQuery<Plant>("plants");
  // return the base days between watering from the codex for each plant
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const getBaseDaysBetweenWatering = (plant: Plant) =>
    plant.baseDaysBetweenWatering;
    

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
  } );

  // HANDLERS
  // When user click "New Plant" button and they are not verified
  // a verification email is sent to them and they are logged out
  const handleNewFormClick = async (e): Promise<void> => {
    // TODO: something weird is happening here, getting Firebase: Error (auth/too-many-requests). when I click the button without being verified
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





const handleWateredClick = async (plantID) => {
  const plantRef = doc(db, `users/${user.uid}/garden`, `${plantID}`)
  await updateDoc (plantRef, {
    timeLastWatered: serverTimestamp(),
  });
  // refetch the data
  queryClient.invalidateQueries(`users/${user.uid}/garden`);
}







// this also seems useless...
const queryClient = useQueryClient();

  const handleOrderDirectionButtonClick = (): void => {
    // TODO: This isn't working
    setOrderDirection((prevOrderDirection) =>
      prevOrderDirection === "asc" ? "desc" : "asc"
    );
    setRotationAngle((prevRotationAngle) =>
      prevRotationAngle === 180 ? 0 : 180
    );

    // Invalidate the cache for the query and trigger it to refetch the data with the updated order

    queryClient.invalidateQueries(`users/${user.uid}/garden`);
  };

  if (isLoading || codexLoading) {
    return (
      <div className="fixed flex justify-center items-center w-screen h-screen">
        <Spinner color="#ffffff" className="relative bottom-[96px] " />
      </div>
    );
  }

  if (error || codexError) {
    return <div>Error, try reloading</div>;
  }

  return (
    <motion.div
      // TODO: fix low fps-looking animation
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
            <section className="mx-6">
              <button
                className="pt-6 pb-4 rounded-full"
                onClick={handleOrderDirectionButtonClick}
              >
                <span className="text-[14] border text-sm  rounded-full border-red-400  px-3 py-[8px]">
                  <span className="">Water Date</span>{" "}
                  <ArrowDownIcon transform={`rotate(${rotationAngle}deg)`} />
                </span>
              </button>
            </section>
            <section className="mx-6">
              {data &&
                data.map((plant, index) => (
                  <Link
                    href={`/garden/${documentIDs[index]}`}
                    key={documentIDs[index]}
                    passHref
                    scroll={false}
                  >
                    <div className="cursor-pointer">
                      <PlantItem
                        
                        key={documentIDs[index]}
                        timeLastWatered={plant.timeLastWatered}
                        level={plant.level}
                        timeCreated={plant.timeCreated}
                        handleWateredClick={() => handleWateredClick(documentIDs[index])}
                        timeTillNextWater={
                          // calculate number of days till next watering
                          // there is no way this is the best way to do this
                          Math.floor(
                            (plant.timeLastWatered.toDate().valueOf() +
                              getBaseDaysBetweenWatering(
                                codexData.find(
                                  (codexPlant) => codexPlant.commonName[0] ===
                                    plant.commonName
                                )
                              ) *
                              1000 *
                              60 *
                              60 *
                              24 -
                              Date.now().valueOf()) /
                            (1000 * 60 * 60 * 24)
                          )}
                        wateringStreak={
                          // calculate number of days since plant was created
                          Math.floor(
                            (Date.now().valueOf() -
                              plant.timeCreated.toDate().valueOf()) /
                            (1000 * 60 * 60 * 24)
                          )}
                        {...plant} />
                    </div>
                  </Link>
                ))}
            </section>

            {user && user.emailVerified ? (
              <Button
                onClick={handleNewFormClick}
                className="mx-6 mb-10 md:invisible"
              >
                New Plant
              </Button>
            ) : (
              <Button
                onClick={handleNewFormClick}
                className="mx-6 mb-10 md:invisible"
              >
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
