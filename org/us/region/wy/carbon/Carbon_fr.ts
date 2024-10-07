import { CarbonCityCode } from "./CarbonCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { rawlins_fr } from "./Rawlins/Rawlins_fr.js"

export const carbon_fr = DepartmentMessages.create("Comté de Carbon", {
  [CarbonCityCode.rawlins]: rawlins_fr
})
