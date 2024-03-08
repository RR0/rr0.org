import { CataloniaDepartementCode } from "./CataloniaDepartementCode"
import { RegionMessages } from "../../../../country/region/RegionMessages"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { lleidaMessages_en } from "./lleida/LleidaMessages_en"

const cataloniaDepartementsMessageList: { [key in CataloniaDepartementCode]: DepartmentMessages<any> } = {
  [CataloniaDepartementCode.Lleida]: lleidaMessages_en
}
export const cataloniaMessages_en = RegionMessages.create("Catalonia",
  cataloniaDepartementsMessageList)
