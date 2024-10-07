import { bloomingtonMessages } from "./bloomington/BloomingtonMessages.js"
import { MonroeCityCode } from "./MonroeCityCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

export const monroe_en = DepartmentMessages.create("Monroe County", {
  [MonroeCityCode.Bloomington]: bloomingtonMessages
})
