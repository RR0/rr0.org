import { bloomingtonMessages } from "./bloomington/BloomingtonMessages"
import { MonroeCityCode } from "./MonroeCityCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export const monroe_en = DepartmentMessages.create("Monroe County", {
  [MonroeCityCode.Bloomington]: bloomingtonMessages
})
