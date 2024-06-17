import { CarbonCityCode } from "./CarbonCityCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { rawlins_fr } from "./Rawlins/Rawlins_fr"

export const carbon_fr = DepartmentMessages.create("Comté de Carbon", {
  [CarbonCityCode.rawlins]: rawlins_fr
})
