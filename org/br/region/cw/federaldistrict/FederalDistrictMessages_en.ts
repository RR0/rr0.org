import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { FederalDistrictCityCode } from "./FederalDistrictCityCode"
import { brasiliaMessages_en } from "./brasilia/BrasiliaMessages_en"

export let federalDistrictMessages_en = new DepartmentMessages(
  "District fédéral",
  {
    [FederalDistrictCityCode.Brasilia]: brasiliaMessages_en
  }
)
