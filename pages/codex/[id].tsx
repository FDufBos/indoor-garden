import { Plant } from "@main/common-types";
import { useFirestoreQuery } from "@main/data-models";
import { useRouter } from "next/router";

import CodexPage from "../../components/fullPages/codexPage";

export const ConstItem: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, error } = useFirestoreQuery<Plant>(`plants/`);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const newLocal = "";
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
              baseDaysBetweenWatering={8}
              bloomTime={newLocal}
              family=""
              flowerColor=""
              hardinessZones=""
              matureSize=""
              nativeAreas={[]}
              plantType={[]}
              soilPh=""
              soilType={plant.soilType}
              sunExposure={[]}
              toxicity= {plant.toxicity}
            />
          ))}
    </div>
  );
};

export default ConstItem;
