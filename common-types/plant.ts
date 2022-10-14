export interface Plant {
  /** The name */
  name: string;
  /** The nickname */
  nickname: string;
  /** The common name */
  commonName: string;
  /** The icon */
  icon: string;
  /** The level of the plant */
  level: number;
  /** The time till next water */
  timeTillNextWater: number;
  /** The time last watered */
  timeLastWatered: string;
  /** The watering streak */
  wateringStreak: number;
  /** The botanical name */
  botanicalName: string;
  /** The amount of required sun exposure  */
  sunExposure: string;
  /** The watering frequency */
  wateringFrequency: string;
}
