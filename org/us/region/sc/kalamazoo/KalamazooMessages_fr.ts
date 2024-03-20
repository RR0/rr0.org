import { galesburgMessages } from "./galesburg/GalesburgMessages"
import { KalamazooCityCode } from "./KalamazooCityCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export const kalamazooMessages_fr = DepartmentMessages.create("Comté de Kalamazoo", {
  [KalamazooCityCode.Galesburg]: galesburgMessages
})
