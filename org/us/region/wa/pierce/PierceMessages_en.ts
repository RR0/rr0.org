import { bonneyLakeMessages } from "./bonneylake/BonneyLakeMessages"
import { PierceCityCode } from "./PierceCityCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export const pierceMessages_en = DepartmentMessages.create("Pierce County", {
  [PierceCityCode.BonneyLake]: bonneyLakeMessages
})
