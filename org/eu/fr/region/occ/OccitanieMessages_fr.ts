import { occitanieMessageList } from "./OccitanieMessageList"
import { RegionMessages } from "../../../../country/region/RegionMessages"
import { OccitanieDepartementCode } from "./OccitanieDepartementCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export const occitanieMessages_fr = new RegionMessages<{ [key in OccitanieDepartementCode]: DepartmentMessages }>(
  "Occitanie", occitanieMessageList
)
