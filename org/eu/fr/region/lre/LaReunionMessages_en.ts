import { RegionMessages } from "../../../../country/region/RegionMessages"
import { LaReunionDepartementCode } from "./LaReunionDepartementCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { laReunion974Messages_en } from "./974/LaReunionCityMessages"

export type LaReunionDepartmentMessagesList = { [key in LaReunionDepartementCode]: DepartmentMessages }

export const laReunionDepartmentsMessages_en: LaReunionDepartmentMessagesList = {
  [LaReunionDepartementCode.LaReunion]: laReunion974Messages_en
}

export const laReunionMessages_en = new RegionMessages<{ [key in LaReunionDepartementCode]: DepartmentMessages }>(
  "Réunion", laReunionDepartmentsMessages_en
)
