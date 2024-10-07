import { UintahCityCode } from "./UintahCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { skinwalker_fr } from "./skinwalker/Skinwalker_fr.js"

export const uintah_fr = DepartmentMessages.create("Comté d'Uintah", {
  [UintahCityCode.Skinwalker]: skinwalker_fr
})
