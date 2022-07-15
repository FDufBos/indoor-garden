import { useEffect, useState } from "react";
import * as React from "react";

import Head from "next/head";
import Link from "next/link";

import Layout from "../components/layout";
import PlantItem from "../components/plantItem";
import NewForm from "../components/newForm";
import BasicButton from "../components/atoms/basicButton";

import { fetchIDs, fetchPlants } from "../data/firestore";

export default function Home() {
  //firestore state
  const [firestorePlants, setFirestorePlants] = useState([]);
  const [documentIDs, setDocumentIDs] = useState([]);

  useEffect(() => {
    fetchPlants().then((data) => {
      setFirestorePlants(data);
    });
    fetchIDs().then((data) => {
      setDocumentIDs(data);
    }
    );
  }, []);

  // useState for newPlatForm
  const [newFormOpen, setNewFormOpen] = useState(false);

  //disable scrolling when newFormOpen is true
  useEffect(() => {
    if (newFormOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [newFormOpen]);

  const handleNewFormClick = () => {
    setNewFormOpen(!newFormOpen);
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
                //show local storage plants
                <Link href={`/garden/${documentIDs[index]}`} key={index}>
                  <a>
                    <PlantItem
                      key={index}
                      icon={plant.icon}
                      name={plant.nickname}
                      commonName={plant.commonName}
                      timeTillNextWater={plant.timeTillNextWater}
                      wateringStreak={plant.wateringStreak}
                      level={plant.level}
                    />
                  </a>
                </Link>
              ))}
          </section>
          {
            //show NewForm if setNewFormOpen is true
            newFormOpen ? (
              <div>
                <NewForm

                  setNewFormOpen={setNewFormOpen}
                />
              </div>
            ) : null
          }
          <button onClick={handleNewFormClick} className="mx-6 mb-10">
            <BasicButton bgColor={"bg-slate-200"} textColor={undefined}>
              New Plant
            </BasicButton>
          </button>
        </main>
      </div>
    </Layout>
  );
}
