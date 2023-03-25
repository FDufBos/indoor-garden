import {Spinner} from "@chakra-ui/react";
import { Plant } from "@main/common-types";
import { useFirestoreQuery } from "@main/data-models";
import { useRouter } from "next/router";

import CodexPage from "../../components/fullPages/codexPage";

export const ConstItem: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, error } = useFirestoreQuery<Plant>(`plants/`);

  if (isLoading) {
    return (
      <div className="bg-monstera-100 fixed flex justify-center items-center w-screen h-screen">
        <Spinner className="relative bottom-[96px] " />
      </div>
    );
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      {data &&
        data
          .filter((plant) => plant.id === id)
          .map((plant, index) => (
            <CodexPage
              key={index}
              botanicalName={plant.botanicalName}
              commonName={plant.commonName}
              emoji={plant.emoji}
              id={plant.id}
              baseDaysBetweenWatering={plant.baseDaysBetweenWatering}
              bloomTime={plant.bloomTime}
              family={plant.family}
              flowerColor={plant.flowerColor}
              hardinessZones={plant.hardinessZones}
              matureSize={plant.matureSize}
              nativeAreas={plant.nativeAreas}
              plantType={plant.plantType}
              soilPh={plant.soilPh}
              soilType={plant.soilType}
              sunExposure={plant.sunExposure}
              toxicity= {plant.toxicity}
            />
          ))}
    </div>
  );
};

export default ConstItem;
