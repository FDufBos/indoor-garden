let Plants = [
  {
    icon: "🌸",
    commonName: "Cherry Blossom",
    nickname: "Doris",
    timeTillNextWater: 2,
    wateringStreak: 2,
    level: 1,
  },
  {
    icon: "🌷",
    commonName: "Tulip",
    nickname: "Saturn",
    timeTillNextWater: 2,
    wateringStreak: 2,
    level: 1,
  },
  {
    icon: "🌻",
    commonName: "Sunflower",
    nickname: "Herschel",
    timeTillNextWater: 2,
    wateringStreak: 2,
    level: 1,
  },
  {
    icon: "🌵",
    nickname: "Kelper",
    commonName: "Saguaro Cactus",
    timeTillNextWater: "38",
    wateringStreak: 174,
    level: 1,
  },
  {
    icon: "🥬",
    nickname: "Bain",
    commonName: "Romaine Lettuce",
    timeTillNextWater: "4",
    wateringStreak: "8",
    level: 1,
  },
];

export function getPlants() {
  return Plants;
}

export function getPlant(id) {
  return Plants[id];
}

export function addPlant(plant) {
  Plants.push(plant);
}