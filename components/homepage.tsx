import { useEffect, useState } from "react";
import * as React from "react";

import Head from "next/head";
import Link from "next/link";

import Layout from "./layout";
import PlantItem from "./plantItem";
import NewForm from "./newForm";
import BasicButton from "./atoms/basicButton";

import { fetchIDs, fetchPlants } from "../data/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useDisclosure, Button } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

import { useUserAuth } from "../contexts/AuthContext";
import { auth } from "../utils/firebaseUtils";

export default function Homepage() {
  const [firestorePlants, setFirestorePlants] = useState([]);
  const [documentIDs, setDocumentIDs] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { user, firestorePlants, documentIDs, setFirestorePlants, setDocumentIDs } = useUserAuth();
  const { user } = useUserAuth();


  useEffect(() => {
    // console.log("homepage.tsx firestorePlants in useEffect: " + firestorePlants)
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        fetchPlants(user.uid).then((data) => {
          setFirestorePlants(data);
        });
        fetchIDs(user.uid).then((data) => {
          setDocumentIDs(data);
        });
      } else {
        setFirestorePlants([]);
      }
    });
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
            {firestorePlants &&
              firestorePlants.map((plant, index) => (
                <Link href={`/garden/${documentIDs[index]}`} key={index}>
                  <div className="cursor-pointer">
                    <PlantItem
                      index={index}
                      key={index}
                      icon={plant.icon}
                      name={plant.nickname}
                      commonName={plant.commonName}
                      timeTillNextWater={
                        Math.floor(
                          (Date.now() - plant.timeLastWatered.toDate()) /
                            (1000 * 60 * 60 * 24)
                        )
                        // 5
                      }
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

          {user ? (
            <Button onClick={handleNewFormClick} className="mx-6 mb-10">
              New Plant
            </Button>
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
