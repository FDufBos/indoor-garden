import { useRouter } from "next/router";
import { fetchPlant } from "../../data/firestore";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

import React from "react";

import PlantPage from "../../components/plantPage";

export default function Plant() {
  //create state to store plant query param
  const [plant, setPlant] = useState("");
  const router = useRouter();

  //useEffect to get plant query param
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (!router.isReady) return;
        await fetchPlant(router.query.name, user.uid).then((plant) => {
          setPlant(plant);
          console.log(plant)
        });
      } else {
        // User is signed out
      }
    });
  }, []);


  return (
    <div>
      <PlantPage
        nickname={plant.nickname}
        commonName={plant.commonName}
        icon={plant.icon}
        level={plant.level}
        timeTillNextWater={plant.timeTillNextWater}
        wateringStreak={plant.wateringStreak}
      />
    </div>
  );
}
