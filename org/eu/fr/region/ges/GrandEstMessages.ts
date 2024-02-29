import { RegionMessages } from "../../../../country/region/RegionMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { GrandEstDepartementCode } from "./GrandEstDepartementCode"
import { grandEstDepartmentsMessages } from "./GrandEstDepartmentsMessages"

export const grandEstMessages = new RegionMessages<{ [key in GrandEstDepartementCode]: DepartmentMessages }>(
  "Occitanie", grandEstDepartmentsMessages
)
