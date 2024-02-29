import { occitanieDepartmentsMessages } from "./OccitanieDepartmentsMessages"
import { RegionMessages } from "../../../../country/region/RegionMessages"
import { OccitanieDepartementCode } from "./OccitanieDepartementCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export const occitanieMessages_en = new RegionMessages<{ [key in OccitanieDepartementCode]: DepartmentMessages }>(
  "Occitania", occitanieDepartmentsMessages
)
