import { CataloniaDepartementCode } from "./CataloniaDepartementCode"
import { RegionMessages } from "../../../../country/region/RegionMessages"
import { lleidaMessages_fr } from "./lleida/LleidaMessages_fr"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"

const cataloniaDepartementsMessageList: { [key in CataloniaDepartementCode]: DepartmentMessages<any> } = {
  [CataloniaDepartementCode.Lleida]: lleidaMessages_fr
}
export const cataloniaMessages_fr = RegionMessages.create("Catalogne",
  cataloniaDepartementsMessageList)
