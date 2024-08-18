import { TimeContext } from "../../TimeContext"

export enum UfoSearchCaseType {
  letter = "letter",
  researchGroup = "research group",
  debriefing = "debriefing",
  historicalEvent = "historical event",
  crashRetrieval = "crash retrieval",
  atomic = "atomic",
  sighting = "sighting",
  ufoSightings = "ufo sightings"
}

export enum UfoSearchCaseAttributes {
  ObserversCivilian = "CIV",
  ObserversOnGround = "GND",
  ObserversMilitary = "MIL",
  HighQualityObservers = "HQO",
  NewsMediaReport = "NWS",
  LikelyMisidentification = "MID",
  NightlightOrPointsOfLight = "NLT",
  TorpedoOrCigarOrCylinderShapedUfo = "CIG",
  ClassicSaucerOrDiskOrSphereShapedUfo = "SCR",
  NoEntityOrOccupantSeenByObservers = "NOC",
  ObservationOrChasingVehicles = "OBS",
  BuildingORManMadeStructureOrRoadsOrPowerLines = "BLD",
  CovertSecurityAgency = "GSA",
  NonCovertGovernmentAgency = "OGA",
  CamouflageOrDisguise = "CMF",
  OddLightOrSearchlightOrBeamOrLaserlike = "RAY",
}

export type UfoSearchCaseExtraData = {
  /**
   * "France"
   */
  Country: string,
  /**
   * "10"
   */
  Credibility: number,
  /**
   * "60"
   */
  Duration: number,
  /**
   * "CHATEL-GUYON,FR:1+SVRL OBS:SLNT 15M CGR >S/1500M alt:LUMn.DISK >S/2050h:/+v4#3"
   */
  HatchDesc: string,
  /**
   * "45.916669 3.066667"
   */
  LatLong: string,
  /**
   * "45:55:00 N 03:04:00 E"
   */
  LatLongDMS: string,
  /**
   * "Mountains"
   */
  Locale: string,
  /**
   * "Google Maps"
   */
  LocationLink: string
  /**
   * "Puy-de-Dôme"
   */
  "State/Prov": string,
  /**
   * "6"
   */
  Strangeness: number
}

export type UfoSearchCaseKeyValues = {
  Country?: string,
  Credibility?: number,
  Duration?: number,
  HatchDesc?: string,

  /**
   * "31.766668 35.233335"
   */
  LatLong?: string,

  /**
   * "31:46:00 N 35:14:00 E"
   */
  LatLongDMS?: string,

  Locale?: string,

  /**
   * "[Google Maps](https://www.google.com/maps/place/31.766668,35.233335)"
   */
  LocationLink?: string,

  "State/Prov"?: string,
  Strangeness?: number,
  url: URL
}

export interface UfoSearchCase {
  id: string
  url: string
  time: TimeContext
  location?: string
  desc: string,
  key_vals: UfoSearchCaseKeyValues,
  ref: string,
  attributes?: UfoSearchCaseAttributes[],

  /**
   * Search keywords for that case.
   */
  search?: string,

  source: string,
  source_id: string,
  type: UfoSearchCaseType
  extraData: UfoSearchCaseExtraData
}
