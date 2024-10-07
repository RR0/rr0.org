import { RegionMessages } from "../../../../country/region/RegionMessages.js"
import { LaReunionDepartementCode } from "./LaReunionDepartementCode.js"
import { laReunion974Messages_fr } from "./974/LaReunion_fr.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

export const laReunionDepartmentsMessages_fr: { [key in LaReunionDepartementCode]: DepartmentMessages<any> } = {
  [LaReunionDepartementCode.LaReunion]: laReunion974Messages_fr
}
export const laReunionRegion_fr = RegionMessages.create<{ [key in LaReunionDepartementCode]: DepartmentMessages<any> }>(
  "La Réunion", laReunionDepartmentsMessages_fr
)
