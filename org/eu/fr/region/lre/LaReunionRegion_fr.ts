import { RegionMessages } from "../../../../country/region/RegionMessages"
import { LaReunionDepartementCode } from "./LaReunionDepartementCode"
import { laReunion974Messages_fr } from "./974/LaReunion_fr"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export const laReunionDepartmentsMessages_fr: { [key in LaReunionDepartementCode]: DepartmentMessages<any> } = {
  [LaReunionDepartementCode.LaReunion]: laReunion974Messages_fr
}
export const laReunionRegion_fr = RegionMessages.create<{ [key in LaReunionDepartementCode]: DepartmentMessages<any> }>(
  "La Réunion", laReunionDepartmentsMessages_fr
)
