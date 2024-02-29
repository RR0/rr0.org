import { gersMessages } from "./32/GersMessages"
import { OccitanieDepartementCode } from "./OccitanieDepartementCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { heraultMessages } from "./34/HeraultMessages"

export type OccitanieDepartmentMessagesList = { [key in OccitanieDepartementCode]: DepartmentMessages }

export const occitanieDepartmentsMessages: OccitanieDepartmentMessagesList = {
  [OccitanieDepartementCode.Gers]: gersMessages,
  [OccitanieDepartementCode.Herault]: heraultMessages
}
