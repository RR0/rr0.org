import { TimeContext } from "../../TimeContext.js"
import { City } from "../../../org/country/region/department/city/City.js"

export type AcufoCaseDataTime = {
  dateTime: TimeContext
  duration?: number
  firstReportTime?: TimeContext
  reportDelay?: number
}

export type AcufoCaseDataLocation = {
  country: string
  departmentOrState: string
  city: City
}

export enum AcufoCaseDataWitnessCount {
  multiple = "Plusieurs"
}

export enum AcufoCaseDataUfoLightConditions {
  Night = "Nuit",
  NotReported = "Non rapporté"
}

export type AcufoCaseDataUfo = {
  testimonyOrigin: string
  lightConditions: AcufoCaseDataUfoLightConditions
  ufoSighted: boolean
  ufoArrivalSighted: boolean
  ufoLeaveSighted: boolean
  ufoActions: string
  witnessActions: string
  photographs: boolean
  drawings: boolean
  witnessApprovedDrawings: boolean
  witnessFeelings: string
  witnessInterpretations: string
}

export type AcufoCaseDataWitness = {
  allegedWitnessCount: AcufoCaseDataWitnessCount
  knownWitnessCount?: number
  namedWitnessCount: number
}

export enum AcufoCaseDataClassificationsSensorsVisual {
  multiple = "Plusieurs"
}

export type AcufoCaseClassificationsSensors = {
  visual: AcufoCaseDataClassificationsSensorsVisual
  aircraftRadar: boolean
  directionalGroundRadar: boolean
  altitudeGroundRadar: boolean
  photograph: boolean
  filmOrVideo: boolean
  emEffects: boolean
  disfunctions: boolean
  damages: boolean
}

export enum AcufoCaseClassificationsHynek {
  NocturalLights = "LN",
  DaylightDisc = "DD",
  CloseEncounter1 = "CE1",
  CloseEncounter2 = "CE2",
  CloseEncounter3 = "CE3",
}

export type AcufoCaseClassifications = {
  sensors: AcufoCaseClassificationsSensors
  hynekClassification: AcufoCaseClassificationsHynek
  weapons: string
  reliability: number
  strangeness: number
  evaluation: string
}

export type AcufoCaseSource = {
  id: string
  reference: string
  title: string
  media: string[]
  content: string
}

export type AcufoCaseAircraftInfo = {
  description: string
  media: string[]
}

export type AcufoCaseData = {
  time: AcufoCaseDataTime
  location: AcufoCaseDataLocation
  witness: AcufoCaseDataWitness
  classifications: AcufoCaseClassifications
  ufo: AcufoCaseDataUfo
}

export type AcufoCaseHistoryRedaction = {
  mainAuthor: string
  contributors: string
  reviewers: string
  editor: string
}

export type AcufoCaseHistoryChange = {
  version: string
  author: string
  dateTime: Date
  description: string
}

export type AcufoCaseHistory = {
  edition: AcufoCaseHistoryRedaction
  changeHistory: AcufoCaseHistoryChange[]
}

/**
 * case number will be like "ACUFO-1945-07-16-NUMAZU-1"
 */
export interface AcufoCase {
  id: string
  url: URL
  city: string
  state: string
  country: string
  summary: string
  dateTime: TimeContext
  reportDate: Date,
  postDate: Date,
  image: boolean,
  shape: string
  data: AcufoCaseData
  sources: AcufoCaseSource[]
  aircraftInfo: AcufoCaseAircraftInfo
  discussion: string
  evaluation: string
  history: AcufoCaseHistory
}
