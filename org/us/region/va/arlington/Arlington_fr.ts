import { ArlingtonCityCode } from "./ArlingtonCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { pentagon_fr } from "./pentagon/Pentagon_fr.js"

export const arlington_fr = DepartmentMessages.create("Comté d'Arlington", {
  [ArlingtonCityCode.Pentagon]: pentagon_fr
})
