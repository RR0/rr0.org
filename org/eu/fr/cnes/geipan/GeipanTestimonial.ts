import { Gender } from "@rr0/common"
import { TimeContext } from "../../../../../time/TimeContext"

export enum GeipanWitnessSightingReaction {
  Emotion_Curiosity = "Emotion - Curiosité",
  Interest_Active = "Intérêt - Actif"
}

export type GeipanWitness = {
  sightingTime: TimeContext
  age: number
  gender: Gender
  reaction: GeipanWitnessSightingReaction[]
}

export enum GeipanTestimonialEnvironment {
  Artificialized_Urban = "Territoires artificialisés - Zones urbanisées",
  Artificialized_Industrial_VehiculeNetwork = `Territoires artificialisés - Zones industrielles ou commerciales et réseaux de communication - Réseaux routier et ferroviaire et espaces associés`
}

export enum GeipanWeatherConditions {
  Unknown = "Inconnu"
}

export enum GeipanReferenceFrame {
  Sky = "Ciel"
}

export enum GeipanSightingStartConditions {
  witnessInitiated = "Conditions d'apparition provoquées par le témoin"
}

export enum GeipanSightingEndConditions {
  phenomenonInitiated = "Conditions de disparition provoquées par le phénomène"
}

export type GeipanTestimonialConditions = {
  area: GeipanTestimonialEnvironment
  weather: GeipanWeatherConditions

  /**
   * Local date and time
   */
  time: TimeContext
  referenceFrame: GeipanReferenceFrame
  sightingStart: GeipanSightingStartConditions
  sightingEnd: GeipanSightingEndConditions
}

export enum GeipanSightingNatureTerm {
  object = "Objet",
  phenomenon = "Phénomène",
  descriptiveTerms = "Termes descriptifs (lumières, forme, etc.)",
}

export enum GeipanSightingType {
  SingleObject = "Objet unique"
}

export enum GeipanShape {
  AnotherUncategorizedShape = "Autre forme non catégorisée",
  Sphere = "3D - 2 axes de symétrie - Sphérique, Boule",
}

export enum GeipanColor {
  multicolor = "Multicolore",
  white = "Blanc",
  orangeFire = "Orangé, feu",
  yellowAmber = "Jaune, Ambre",
}

export enum GeipanSpeed {
  Slow = "Lente",
  Dazzling = "Fulgurante",
  Unknown = "Inconnu",
}

export enum GeipanSound {
  None = "Aucun, Silence total",
  Unknown = "Inconnu",
}

export enum GeipanEnvironmentImpact {
  Unknown = "Inconnu - Non précisé"
}

export type GeipanSightingLocalization = {
  /**
   * Degrees.
   */
  sightingDirection_horizontal?: number

  sightingNature: GeipanSightingNatureTerm[]
  sightingType: GeipanSightingType
  shape: GeipanShape
  colors: GeipanColor[]

  /**
   * In meters.
   */
  apparentDiameter: number

  apparentSpeed: GeipanSpeed

  sound: GeipanSound

  impactOnEnvironment: GeipanEnvironmentImpact

  phenomenonCount: number
}

export type GeipanTestimonial = {
  witness: GeipanWitness
  condition: GeipanTestimonialConditions[]
  localization: GeipanSightingLocalization
}
