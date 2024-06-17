import { CarbonCityCode } from "./CarbonCityCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { rawlins_en } from "./Rawlins/Rawlins_en"

export const carbon_en = DepartmentMessages.create("Carbon County", {
  [CarbonCityCode.rawlins]: rawlins_en
})
