import { CarbonCityCode } from "./CarbonCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { rawlins_en } from "./Rawlins/Rawlins_en.js"

export const carbon_en = DepartmentMessages.create("Carbon County", {
  [CarbonCityCode.rawlins]: rawlins_en
})
