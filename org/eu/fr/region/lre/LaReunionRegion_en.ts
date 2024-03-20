import { RegionMessages } from "../../../../country/region/RegionMessages"
import { LaReunionDepartementCode } from "./LaReunionDepartementCode"
import { laReunion974Messages_en } from "./974/LaReunion_en"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export const laReunionDepartmentsMessages_en: { [key in LaReunionDepartementCode]: DepartmentMessages<any> } = {
  [LaReunionDepartementCode.LaReunion]: laReunion974Messages_en
}
export const laReunionRegion_en = RegionMessages.create<{ [key in LaReunionDepartementCode]: DepartmentMessages<any> }>(
  "Réunion", laReunionDepartmentsMessages_en
)
