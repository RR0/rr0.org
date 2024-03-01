import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { FederalDistrictCityCode } from "./FederalDistrictCityCode"
import { brasiliaMessages_fr } from "./brasilia/BrasiliaMessages_fr"

export let federalDistrictMessages_fr = new DepartmentMessages(
  "Federal District",
  {
    [FederalDistrictCityCode.Brasilia]: brasiliaMessages_fr
  }
)
