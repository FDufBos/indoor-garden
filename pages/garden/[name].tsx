import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import PlantPage from "../../components/fullPages/plantPage";
import SkeletonPlantPage from "../../components/loading/skeletonPlantPage";
import { useUserAuth } from "../../contexts/AuthContext";
import { fetchPlant } from "../../data/firestore";

export const Plant: React.FC = () => {
  // create state to store plant query param
  // TODO: Create Plant Type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [plant, setPlant] = useState<any>();
  // const [codex, setCodex] = useState("");
  const router = useRouter();
  const { user, codex } = useUserAuth();
  // TODO: Create Plant Type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [codexPlant, setCodexPlant] = useState<any>("");

  // useEffect to get plant query param
  useEffect(() => {
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
  }, []);

  return (
    <div>
      {plant && codexPlant ? (
        <div>
          {/* {<div>{documentIDs[2]}</div>} */}
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
        <SkeletonPlantPage />
      )}
    </div>
  );
};
export default Plant;
