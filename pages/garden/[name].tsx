import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import PlantPage from "../../components/fullPages/plantPage";
import SkeletonPlantPage from "../../components/loading/skeletonPlantPage";
import { useUserAuth } from "../../contexts/AuthContext";
import { fetchPlant } from "../../data/firestore";

export const Plant: React.FC = () => {
  // create state to store plant query param
  // TODO: Create Plant Type

  const [plant, setPlant] = useState<any>();
  const router = useRouter();
  const { user, codex } = useUserAuth();
  const [codexPlant, setCodexPlant] = useState<any>("");

  interface Image {
    /** URL of image */
    url: string;
    /** Firebase timestamp of when image was uploaded */
    uploadedAt: Timestamp;
  }

  useEffect(() => {
    if (user) {
      if (!router.isReady) return;
      fetchPlant(router.query.name, user.uid).then((plant) => {
        setPlant(plant);
        if (codex) {
          codex.forEach((doc) => {
            const codexCommonName = doc.commonName[0];
            const plantCommonName = plant.commonName;
            if (codexCommonName === plantCommonName) {
              setCodexPlant(doc);
            }
          });
        }
      });
    } else {
      // User is signed out
    }
  }, [codex, router.isReady, router.query.name, user]);

  return (
    <div>
      {plant && codexPlant ? (
        <div>
          <PlantPage
            nickname={plant.nickname}
            commonName={plant.commonName}
            icon={plant.icon}
            level={plant.level}
            timeTillNextWater={plant.timeTillNextWater}
            wateringStreak={plant.wateringStreak}
            botanicalName={codexPlant.botanicalName}
            sunExposure={codexPlant.sunExposure}
            baseDaysBetweenWatering={codexPlant.baseDaysBetweenWatering}
            soilType={codexPlant.soilType}
            bloomTime={codexPlant.bloomTime}
            plantId={router.query.name}
            user={user.id}
            images={
              plant.images && plant.images.map((image: Image) => image.url)
            }
          />
        </div>
      ) : (
        <SkeletonPlantPage />
      )}
    </div>
  );
};
export default Plant;
