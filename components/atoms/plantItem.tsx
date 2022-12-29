import { GardenItem } from "@main/common-types";

export const PlantItem: React.FC<
  Partial<GardenItem> & {
    /** The document index */
    index: string;
    /** The Id of the plant this card points to */
    documentID: string;
    /** clickhandler */
    onClick : () => void;
    
  }
> = ({
  icon,
  nickname,
  commonName,
  timeTillNextWater,
  wateringStreak,
  level,
  onClick
// eslint-disable-next-line arrow-body-style
}) => {



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
          onClick={onClick}
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
