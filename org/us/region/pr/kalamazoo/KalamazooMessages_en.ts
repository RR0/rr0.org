import { galesburgMessages } from "./galesburg/GalesburgMessages.js"
import { KalamazooCityCode } from "./KalamazooCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

export const kalamazooMessages_en = DepartmentMessages.create("Kalamazoo County", {
  [KalamazooCityCode.Galesburg]: galesburgMessages
})
