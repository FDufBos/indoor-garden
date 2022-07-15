import Router, { useRouter } from "next/router";
import { fetchPlant } from "../../data/firestore";
import { useEffect, useState } from "react";

import React from "react";

import PlantPage from "../../components/plantPage";

export default function Plant() {
  //create state to store plant query param
  const [plant, setPlant] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    const plant = fetchPlant(router.query.name).then((plant) => {
      setPlant(plant);
    });
  }, [router.isReady]);

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
