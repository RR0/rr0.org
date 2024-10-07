import { CataloniaDepartementCode } from "./CataloniaDepartementCode.js"
import { RegionMessages } from "../../../../country/region/RegionMessages.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { lleidaMessages_en } from "./lleida/LleidaMessages_en.js"

const cataloniaDepartementsMessageList: { [key in CataloniaDepartementCode]: DepartmentMessages<any> } = {
  [CataloniaDepartementCode.Lleida]: lleidaMessages_en
}
export const cataloniaMessages_en = RegionMessages.create("Catalonia",
  cataloniaDepartementsMessageList)
