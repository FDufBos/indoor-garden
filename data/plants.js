let Plants = [
  {
    icon: "🌸",
    commonName: "Cherry Blossom",
    nickname: "Doris",
    timeTillNextWater: 2,
    wateringStreak: 2,
    level: 1,
    id: "doris"
  },
  {
    icon: "🌷",
    commonName: "Tulip",
    nickname: "Saturn",
    timeTillNextWater: 2,
    wateringStreak: 2,
    level: 1,
    id: "saturn"
  },
  {
    icon: "🌻",
    commonName: "Sunflower",
    nickname: "Herschel",
    timeTillNextWater: 2,
    wateringStreak: 2,
    level: 1,
    id: "herschel",
  },
  {
    icon: "🌵",
    nickname: "Kelper",
    commonName: "Saguaro Cactus",
    timeTillNextWater: "38",
    wateringStreak: 174,
    level: 1,
    id : "kelper"
  },
  {
    icon: "🥬",
    nickname: "Bain",
    commonName: "Romaine Lettuce",
    timeTillNextWater: "4",
    wateringStreak: "8",
    level: 1,
    id: "bain",
  },
];

export function getPlants() {
  // //if plants exists in local storage, return it

  // if (typeof window !== 'undefined') {
  //   // Perform localStorage action
  //   if (localStorage.getItem("plants")) {
  //     //return plants from local storage and make them
  //     // console.log(JSON.parse(localStorage.getItem("plants")))
  //   } else {
  //     //if not, return the default plants
      
  //   return Plants;
  //   }
  // }
  return Plants;
  
  
}

export function getPlant(id) {
  return Plants.find(plant => plant.id === id);
}

export function addPlant(plant) {
  Plants.push(plant);
}