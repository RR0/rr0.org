import { gersMessages } from "./32/GersMessages"
import { OccitanieDepartementCode } from "./OccitanieDepartementCode"
import { heraultMessages } from "./34/HeraultMessages"
import { tarnEtGaronneMessages } from "./82/TarnEtGaronneMessages"
import { hauteGaronneMessages } from "./31/HauteGaronneMessages"
import { audeMessages } from "./11/AudeMessages"
import { tarnMessages } from "./81/TarnMessages"
import { gardMessages } from "./30/GardMessages"
import { OrganizationMessages } from "../../../../OrganizationMessages"

export const occitanieDepartmentsMessages: { [key in OccitanieDepartementCode]: OrganizationMessages } = {
  [OccitanieDepartementCode.Aude]: audeMessages,
  [OccitanieDepartementCode.Gard]: gardMessages,
  [OccitanieDepartementCode.Gers]: gersMessages,
  [OccitanieDepartementCode.HauteGaronne]: hauteGaronneMessages,
  [OccitanieDepartementCode.Herault]: heraultMessages,
  [OccitanieDepartementCode.Tarn]: tarnMessages,
  [OccitanieDepartementCode.TarnEtGaronne]: tarnEtGaronneMessages
}
