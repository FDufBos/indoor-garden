import { GardenItem } from "@main/common-types";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import Router from "next/router";

import { useUserAuth } from "../../contexts/AuthContext";
import { db } from "../../utils/firebaseUtils";

export const PlantItem: React.FC<
  Partial<GardenItem> & {
    /** Set the time until the next water */
    setTimeTillNextWater: (number) => void;
    /** The document index */
    index: string;
  }
> = ({
  icon,
  nickname,
  commonName,
  timeTillNextWater,
  setTimeTillNextWater,
  wateringStreak,
  level,
  index,
}) => {
  const { user, documentIDs, firestorePlants } = useUserAuth();

  const handleLevelClick = async (e): Promise<void> => {
    e.preventDefault();
    // if timeTillNext Water is not zero, then updateDoc to serverTimeStamp
    if (timeTillNextWater !== 0) {
      const plantRef = doc(db, `users/${user.uid}/garden/`, documentIDs[index]);
      // console.log(plantRef)
      await updateDoc(plantRef, {
        timeLastWatered: serverTimestamp(),
      });
      setTimeTillNextWater(firestorePlants[index].timeTillNextWater);
      // reload page
      Router.reload();
    }
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex">
        <div
          id="image-circle"
          className="bg-[#FCFEF8] w-16 h-16 rounded-full drop-shadow flex flex-col justify-center items-center"
        >
          <div id="plant-image" className="text-4xl text-center">
            {icon}
          </div>
        </div>
        <button
          onClick={handleLevelClick}
          id="image-label"
          // eslint-disable-next-line max-len
          className="flex items-center justify-center bg-water-100 h-6 w-6 rounded-full drop-shadow text-grey-600 font-[690] text-sm relative top-11 -left-6"
        >
          {level}
        </button>
        <div className="flex flex-col h-full">
          <h3 className="text-xl font-[580]">{nickname}</h3>
          <h4 className="text-xs text-water-100">{commonName}</h4>
          <div className="flex gap-2">
            <div>💧 {timeTillNextWater}</div>
            <div>🔥 {wateringStreak}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlantItem;
