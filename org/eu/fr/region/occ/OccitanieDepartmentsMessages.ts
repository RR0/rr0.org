import { gersMessages } from "./32/GersMessages"
import { OccitanieDepartementCode } from "./OccitanieDepartementCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { heraultMessages } from "./34/HeraultMessages"
import { tarnEtGaronneMessages } from "./82/TarnEtGaronneMessages"
import { hauteGaronneMessages } from "./31/HauteGaronneMessages"
import { audeMessages } from "./11/AudeMessages"

export type OccitanieDepartmentMessagesList = { [key in OccitanieDepartementCode]: DepartmentMessages }

export const occitanieDepartmentsMessages: OccitanieDepartmentMessagesList = {
  [OccitanieDepartementCode.Aude]: audeMessages,
  [OccitanieDepartementCode.Gers]: gersMessages,
  [OccitanieDepartementCode.HauteGaronne]: hauteGaronneMessages,
  [OccitanieDepartementCode.Herault]: heraultMessages,
  [OccitanieDepartementCode.TarnEtGaronne]: tarnEtGaronneMessages
}
