import { RegionMessages } from "../../../../country/region/RegionMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { LesserPolandDepartementCode } from "./LesserPolandDepartementCode"
import { suchaMessages_en } from "./sucha/SuchaMessages_en"

const cataloniaDepartementsMessageList: { [key in LesserPolandDepartementCode]: DepartmentMessages<any> } = {
  [LesserPolandDepartementCode.Sucha]: suchaMessages_en
}
export const lesserPolandMessages_en = RegionMessages.create("Lesser Poland",
  cataloniaDepartementsMessageList)
