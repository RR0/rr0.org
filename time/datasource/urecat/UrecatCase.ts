import { TimeContext } from "../../TimeContext.js"

export type UrecatCaseHistoryRedaction = {
  mainAuthor: string
  contributors: string
  reviewers: string
  editor: string
}

export type UrecatCaseHistoryChange = {
  version: string
  author: string
  dateTime: Date
  description: string
}

export type UrecatCaseHistory = {
  edition: UrecatCaseHistoryRedaction
  changeHistory: UrecatCaseHistoryChange[]
}

export enum UrecatCaseLightConditions {
  Night = "Nuit",
  NotReported = "Non rapporté"
}

export type UrecatWitness = {
  name: string
  age?: string
  drawing?: boolean
  reactions?: string
  feelings?: string
}

export type UrecatLocation = {
  placeName: string
  country: string
  departmentOrState: string
  placeType?: string
}

export type UrecatBasicBaseInfo = {
  /**
   * "URECAT-000448"
   */
  caseNumber?: string

  sightingDate: TimeContext
  firstReportTime?: Date | string
  reportDelay?: string
  testimonyOrigin?: string
  firstAllegedRecordBy?: string
  firstVerifiedRecordBy?: string
  firstAllegedRecordType?: string
  firstVerifiedRecordType?: string
  caseCreation?: Date
  caseUdpate?: Date
  location: UrecatLocation
  lightConditions?: UrecatCaseLightConditions
  ufoSighted?: boolean
  ufoArrivalSighted?: boolean
  ufoLeaveSighted?: boolean
  ufoEntityRelationship?: boolean
  witnesses: UrecatWitness[]
  photographs?: boolean
  witnessApprovedDrawings?: boolean
}

export type UrecatBasicEntityInfo = {
  entityCount: number
  entityType: string
  entitySize: string
  entityClothing: string
  entityClothingColor: string
  entitySkinColor: string
  entityBodies: string
  entityHeads: string
  entityEyes: string
  entityMouths: string
  entityNoses: string
  entityFeet: string
  entityArms: string
  entityFingers: string
  entityFingersCount: number
  entityHairs: string
  entityVoices: string
  entityActions: string
  entityWitnessInteractions: string
  explanationCategory: string
  explanationConfidence: string
}

export type UrecatBasicInfo = {
  base: UrecatBasicBaseInfo
  entity?: UrecatBasicEntityInfo
}

export type UrecatCaseAccount = {
  ref: string
  author: string
  content: string
  reference: string
}

export enum UrecatCaseIssueType {
  Data = "Données",
  Ufology = "Ufologie"
}

export enum UrecatCaseIssueStatus {
  Open = "Ouvert"
}

export type UrecatCaseIssue = {
  id: number
  type: UrecatCaseIssueType
  time: Date
  reportedBy: string
  notedBy: string
  description: string
  proposal: string
  status: UrecatCaseIssueStatus
}

export interface UrecatCase {
  id: string
  time: TimeContext
  url: string
  title: string
  summary?: string
  basicInfo: UrecatBasicInfo
  accounts?: UrecatCaseAccount[]
  notes?: string
  issues?: UrecatCaseIssue[]
  evaluation?: string
  history?: UrecatCaseHistory
}
