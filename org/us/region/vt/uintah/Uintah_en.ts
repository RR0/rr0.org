import { UintahCityCode } from "./UintahCityCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { skinwalker_en } from "./skinwalker/Skinwalker_en"

export const uintah_en = DepartmentMessages.create("Uintah County", {
  [UintahCityCode.Skinwalker]: skinwalker_en
})
