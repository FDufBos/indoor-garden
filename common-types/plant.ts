export interface Plant {
  /** baseDaysBetweenWatering */
  baseDaysBetweenWatering: number;
  /** bloomTime */
  bloomTime: string;
  /** botanicalName */
  botanicalName: string;
  /** commonName */
  commonName: string[];
  /** Emoji */
  emoji: string;
  /** family */
  family: string;
  /** flowerColor */
  flowerColor: string;
  /** hardinessZones */
  hardinessZones: string;
  /** id  */
  id: string;
  /** matureSize */
  matureSize: string;
  /** nativeAreas */
  nativeAreas: string[];
  /** plantType */
  plantType: string[];
  /** soilPh */
  soilPh: string;
  /** soilType */
  soilType: string;
  /** sunExposure */
  sunExposure: string[];
  /** toxicity */
  toxicity: string;
}
