import { gersMessages } from "./32/GersMessages"
import { OccitanieDepartementCode } from "./OccitanieDepartementCode"
import { heraultMessages } from "./34/HeraultMessages"
import { tarnEtGaronneMessages } from "./82/TarnEtGaronneMessages"
import { hauteGaronneMessages } from "./31/HauteGaronneMessages"
import { audeMessages } from "./11/AudeMessages"
import { tarnMessages } from "./81/TarnMessages"
import { gardMessages } from "./30/GardMessages"
import { OrganizationMessages } from "../../../../OrganizationMessages"
import { pyreneesOrientalesMessages } from "./66/PyreneesOrientalesMessages"
import { ariegeMessages } from "./09/AriegeMessages"
import { hauteVienneMessages } from "./87/HauteVienneMessages"
import { aveyronMessages } from "./12/AveyronMessages"
import { hautesPyreneesMessages } from "./65/HautesPyreneesMessages"

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
