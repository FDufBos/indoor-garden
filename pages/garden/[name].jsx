import { useRouter } from "next/router";
import { fetchPlant } from "../../data/firestore";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { doc, data } from "firebase/firestore";

const auth = getAuth();
import { useUserAuth } from "../../contexts/AuthContext";

import React from "react";

import PlantPage from "../../components/fullPages/plantPage";

export default function Plant() {
  //create state to store plant query param
  const [plant, setPlant] = useState("");
  // const [codex, setCodex] = useState("");
  const router = useRouter();
  const { user, codex, setCodex, documentIDs } = useUserAuth();
  const [codexPlant, setCodexPlant] = useState("");

  //useEffect to get plant query param
  useEffect(() => {
    console.log("useEffect ran on [name]");
    // onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (!router.isReady) return;
      fetchPlant(router.query.name, user.uid).then((plant) => {
        setPlant(plant);
        if (codex) {
          codex.forEach((doc) => {
            const codexCommonName = doc.commonName[0];
            const plantCommonName = plant.commonName;
            // console.log(codexCommonName);
            // console.log(plantCommonName);
            if (codexCommonName === plantCommonName) {
              setCodexPlant(doc);
              // console.log(doc)
            }
          });
        }
      });
    } else {
      // User is signed out
    }
    // });
    // if(codexPlant.sunExposure){
    //   console.log(codexPlant.sunExposure.join(", "));
    // }
  },[]);
  

  return (
    <div>
      {plant && codexPlant ? (
        <div>
          {<div>{documentIDs[2]}</div>}
          <PlantPage
            nickname={plant.nickname}
            commonName={plant.commonName}
            icon={plant.icon}
            level={plant.level}
            timeTillNextWater={plant.timeTillNextWater}
            wateringStreak={plant.wateringStreak}
            botanicalName={codexPlant.botanicalName}
            sunExposure={codexPlant.sunExposure}
            wateringFrequency={codexPlant.baseDaysBetweenWatering}
          />
        </div>
      ) : (
        <SkeletonPlantPage></SkeletonPlantPage>
      )}
    </div>
  );
}
