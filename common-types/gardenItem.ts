import { Timestamp } from "firebase/firestore";

export interface GardenItem {
  /** The common name of the plant */
  commonName: string;
  /** The emoji icon to use */
  icon: string;
  /** The plant level */
  level: number;
  /** The plant nickname */
  nickname: string;
  /** Time Created */
  timeCreated: Timestamp;
  /** Time last watered */
  timeLastWatered: Timestamp;
  /** Time till next water */
  timeTillNextWater: number;
  /** Watering streak length */
  wateringStreak: number;
  /** Plant ID */
  id: string;
}
