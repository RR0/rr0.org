import { bloomingtonMessages } from "./bloomington/BloomingtonMessages"
import { MonroeCityCode } from "./MonroeCityCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

export const monroe_fr = DepartmentMessages.create("Comté de Monroe", {
  [MonroeCityCode.Bloomington]: bloomingtonMessages
})
