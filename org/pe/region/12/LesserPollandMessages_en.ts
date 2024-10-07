import { RegionMessages } from "../../../../country/region/RegionMessages.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { LesserPolandDepartementCode } from "./LesserPolandDepartementCode.js"
import { suchaMessages_en } from "./sucha/SuchaMessages_en.js"

const cataloniaDepartementsMessageList: { [key in LesserPolandDepartementCode]: DepartmentMessages<any> } = {
  [LesserPolandDepartementCode.Sucha]: suchaMessages_en
}
export const lesserPolandMessages_en = RegionMessages.create("Lesser Poland",
  cataloniaDepartementsMessageList)
