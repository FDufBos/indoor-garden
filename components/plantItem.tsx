import { motion, AnimatePresence } from "framer-motion";

export default function PlantItem({
  icon,
  name,
  commonName,
  timeTillNextWater,
  wateringStreak,
  level,
  timeCreated,
}) {

  const handleLevelClick=(e)=>{
    e.preventDefault();
    console.log("hello")
  }
  return (
    <div className="flex justify-between items-center mb-6">

        <div
          className="flex"
        >
          <div
            id="image-circle"
            className="bg-[#FCFEF8] w-16 h-16 rounded-full drop-shadow flex flex-col justify-center items-center"
          >
            <div id="plant-image" className="text-4xl text-center">
              {icon}
            </div>
          </div>
          <button onClick={handleLevelClick}
            id="image-label"
            className="flex items-center justify-center bg-water-100 h-6 w-6 rounded-full drop-shadow text-grey-600 font-[690] text-sm relative top-11 -left-6"
          >
            {level}
          </button>
          <div className="flex flex-col h-full">
            <h3 className="text-xl font-[580]">{name}</h3>
            <h4 className="text-xs text-water-100">{commonName}</h4>
            <div className="flex gap-2">
              <div>💧 {timeTillNextWater}</div>
              <div>🔥 {wateringStreak}</div>
            </div>
          </div>
        </div>
      <div id="more-info">
        <div className="bg-[#7ea981] flex justify-center align-middle font-alpina h-6 w-6 rounded-full border-[#c6dfc8] border-2 text-sm">
          <p>i</p>
        </div>
      </div>
    </div>
  );
}
