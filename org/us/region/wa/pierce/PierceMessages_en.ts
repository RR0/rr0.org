import { bonneyLakeMessages } from "./bonneylake/BonneyLakeMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { PierceCityCode } from "./PierceCityCode"

export let pierceMessages_en = new DepartmentMessages(
  "Pierce County",
  {
    [PierceCityCode.BonneyLake]: bonneyLakeMessages
  }
)
