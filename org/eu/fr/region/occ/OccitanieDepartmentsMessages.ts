import { gersMessages } from "./32/GersMessages.js"
import { OccitanieDepartementCode } from "./OccitanieDepartementCode.js"
import { heraultMessages } from "./34/HeraultMessages.js"
import { tarnEtGaronneMessages } from "./82/TarnEtGaronneMessages.js"
import { hauteGaronneMessages } from "./31/HauteGaronneMessages.js"
import { audeMessages } from "./11/AudeMessages.js"
import { tarnMessages } from "./81/TarnMessages.js"
import { gardMessages } from "./30/GardMessages.js"
import { OrganizationMessages } from "../../../../OrganizationMessages.js"
import { pyreneesOrientalesMessages } from "./66/PyreneesOrientalesMessages.js"
import { ariegeMessages } from "./09/AriegeMessages.js"
import { hauteVienneMessages } from "./87/HauteVienneMessages.js"
import { aveyronMessages } from "./12/AveyronMessages.js"
import { hautesPyreneesMessages } from "./65/HautesPyreneesMessages.js"

export type OccitanieDepartmentsMessages = { [key in OccitanieDepartementCode]: OrganizationMessages }
export const occitanieDepartmentsMessages: OccitanieDepartmentsMessages = {
  [OccitanieDepartementCode.Ariege]: ariegeMessages,
  [OccitanieDepartementCode.Aude]: audeMessages,
  [OccitanieDepartementCode.Aveyron]: aveyronMessages,
  [OccitanieDepartementCode.Gard]: gardMessages,
  [OccitanieDepartementCode.Gers]: gersMessages,
  [OccitanieDepartementCode.HauteGaronne]: hauteGaronneMessages,
  [OccitanieDepartementCode.HauteVienne]: hauteVienneMessages,
  [OccitanieDepartementCode.HautesPyrenees]: hautesPyreneesMessages,
  [OccitanieDepartementCode.Herault]: heraultMessages,
  [OccitanieDepartementCode.Tarn]: tarnMessages,
  [OccitanieDepartementCode.TarnEtGaronne]: tarnEtGaronneMessages,
  [OccitanieDepartementCode.PyreneesOrientales]: pyreneesOrientalesMessages
}
