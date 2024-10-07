import { TimeContext } from "../../TimeContext.js"

export enum BaseOvniFranceTypeObservation {
  visualClose = "Visuel : proche",
  visualFar = "Visuel : Eloigné",
}

export enum BaseOvniFranceBrightness {
  bright = "Brillant",
  notSpecified = "Luminosité non indiquée",
}

export enum BaseOvniFranceColor {
  metallic = "Métallique (argent,)",
  notDefined = "Non définie",
  red = "Rouge",
  yellow = "Jaune",
  orange = "Orange",
  white = "Blanc",
  grey = "Gris",
  changing = "Changement couleur",
  multiple = "Plusieurs couleurs",
}

export enum BaseOvniFranceTypeObjet {
  disc = "Disque",
  multipleShapesForProbablySameObject = "Plusieurs formes pour sans doute un même objet",
  lightsSinudoid = "sinusoïde de lumières",
  elliptic = "Elliptique",
  notDefined = "Non-défini",
  rectangle = "Rectangle",
  lightBall = "Boule Lumineuse",
  ovoid = "Ovoïde",
  halfSphere = "Demi sphère",
  sphere = "Sphère",
  flattenedHexagonal = "Hexagonal aplati",
}

export enum BaseOvniFranceVisualEffect {
  sparksShower = "gerbes d'étincelles",
  trail = "Trainée",
  lightBeam = "faisceau de lumière",
  numerousLights = "Nombreuses lumières",
}

export enum BaseOvniFranceSpeed {
  slowThenFast = "lent puis rapide",
  stationary = "Immobile",
  fastThenSlow = "Rapide puis lent",
  slow = "Lent",
  fast = "Rapide",
  veryFast = "Extrèmement rapide",
}

export enum BaseOvniFranceTrajectory {
  stationaryAboveGroundThenEscape = "Stationnaire au-dessus du sol puis fuite",
  diveIntoWater = "Plonge dans l'eau",
  straightLine = "En ligne droite",
  leaveFall = "Descente en feuille morte",
  descent = "Descente",
  climb = "Montée",
  variousManeuvers = "Diverses maneuvres",
  evolveThroughJumps = "Evolution par bonds",
  verticalClimbTowardSky = "Montée verticale dans le ciel",
}

export enum BaseOvniFranceEntityType {
}

export enum BaseOvniFranceEntityAction {
}

export enum BaseOvniFranceWitnessEffect {
  occularTroubles = "Troubles Occulaires",
  missingTime = "Temps manquant",
  headache = "maux de tête",
  psychologicalShock = "Choc psychologique",
  projection = "Projection",
  backwardProjectoin = "rejet en arrière",
}

export enum BaseOvniFranceWeatherConditions {
  unknown = "Météo inconnue",
  fewClouds = "Nuages épars",
  lowOvercast = "Ciel couvert basse altitude",
  hightOvercast = "Ciel couvert haute altitude",
  clear = "Beau temps, ciel clair",
}

export enum BaseOvniFrancePhysicalEffect {
  responseToLightSignal = "Réponse à un signal lumineux",
  earsRinging = "Bourdonnement",
  airDisplacement = "déplacement d'air",
  insomnia = "Insomnies",
  animalsReactions = "Réaction des animaux",
}

export enum BaseOvniFranceSize {
  twentyToTwentyFive = "20 à 25 mètres (évaluée)",
  fullMoon = "Pleine Lune (apparente)",
  pearl = "taille d'une bille (apparente)",
}

export interface BaseOvniFranceCaseSummary {
  readonly id: string
  readonly url: string
  readonly time: TimeContext
  readonly city: string,
  readonly depCode: string,

  /**
   * Number of seconds, or "N.C."
   */
  readonly duration?: number,

  readonly objectsCount?: number,
  readonly objectType?: BaseOvniFranceTypeObjet,
  readonly physicalEffect: boolean,
  readonly witnessEffect: boolean,
  readonly entities: boolean,
  readonly landing: boolean
  readonly latitude?: number
  readonly longitude?: number
  readonly sightingAccount?: string
  readonly typeObs?: BaseOvniFranceTypeObservation
  readonly color?: BaseOvniFranceColor
  readonly brightness?: BaseOvniFranceBrightness
  readonly visualEffect?: BaseOvniFranceVisualEffect
  readonly instantDisparition?: boolean
  readonly speed?: BaseOvniFranceSpeed
  readonly movementOrTrajectory?: BaseOvniFranceTrajectory
  readonly size?: BaseOvniFranceSize

  readonly entityType?: BaseOvniFranceEntityType
  readonly entityCount?: number
  readonly entityAction?: BaseOvniFranceEntityAction
  readonly effectOnWitness?: BaseOvniFranceWitnessEffect[]
  readonly physicalWitness?: BaseOvniFrancePhysicalEffect[]
  readonly witnessCount?: number
  readonly officialInvestigation?: boolean
  readonly weatherConditions?: BaseOvniFranceWeatherConditions[]
}
