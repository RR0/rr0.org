import { RegionMessages } from "../../../../country/region/RegionMessages"
import { LaReunionDepartementCode } from "./LaReunionDepartementCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { laReunion974Messages_fr } from "./974/LaReunionCityMessages_fr"

export type LaReunionDepartmentMessagesList = { [key in LaReunionDepartementCode]: DepartmentMessages }

export const laReunionDepartmentsMessages_fr: LaReunionDepartmentMessagesList = {
  [LaReunionDepartementCode.LaReunion]: laReunion974Messages_fr
}

export const laReunionMessages_fr = new RegionMessages<{ [key in LaReunionDepartementCode]: DepartmentMessages }>(
  "La Réunion", laReunionDepartmentsMessages_fr
)
