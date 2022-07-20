import { useEffect, useState } from "react";
import * as React from "react";

import Head from "next/head";
import Link from "next/link";

import Layout from "../components/layout";
import PlantItem from "../components/plantItem";
import NewForm from "../components/newForm";
import BasicButton from "../components/atoms/basicButton";

import { fetchIDs, fetchPlants } from "../data/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";

import { useDisclosure } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const auth = getAuth();
// const user = auth.currentUser;

import { useUserAuth } from "../contexts/AuthContext";

export default function Home() {
  //firestore state
  const [firestorePlants, setFirestorePlants] = useState([]);
  const [documentIDs, setDocumentIDs] = useState([]);
  const [signedIn, setSignedIn] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, userDocument } = useUserAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignedIn(true);

        fetchPlants(user.uid).then((data) => {
          setFirestorePlants(data);
        });
        fetchIDs(user.uid).then((data) => {
          setDocumentIDs(data);
        });
      } else {
        // User is signed out
        setSignedIn(false);
        setFirestorePlants([]);
      }
    });
    // async function getData() {
    //   const data = await fetchPlants(user.uid);
    //   setFirestorePlants(data);
    // }
    // async function getIDs() {
    //   const data = await fetchIDs(user.uid);
    //   setDocumentIDs(data);
    // }
    // if (user) {

    //   console.log(user.uid);
    //   console.log(userDocument);

    //   getData();
    //   getIDs();
    // } else {

    //   setFirestorePlants([]);

    // }
  }, []);

  const handleNewFormClick = (e) => {
    e.preventDefault();
    onOpen();
  };

  return (
    <Layout>
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
          <section className=" mx-6">
            {user &&
              firestorePlants &&
              firestorePlants.map((plant, index) => (
                //show local storage plants
                <Link href={`/garden/${documentIDs[index]}`} key={index}>
                  <div 
                  className="cursor-pointer">
                    <PlantItem
                      key={index}
                      icon={plant.icon}
                      name={plant.nickname}
                      commonName={plant.commonName}
                      timeTillNextWater={plant.timeTillNextWater}
                      wateringStreak={plant.wateringStreak}
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
              firestorePlants={firestorePlants}
            />
          </div>

          {user ? (
            <button onClick={handleNewFormClick} className="mx-6 mb-10">
              <BasicButton bgColor={"bg-slate-200"} textColor={undefined}>
                New Plant
              </BasicButton>
            </button>
          ) : (
            <div className="mx-6 mb-10">
              <div>Sign In to Add a Plant</div>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
