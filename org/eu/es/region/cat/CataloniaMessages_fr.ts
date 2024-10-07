import { CataloniaDepartementCode } from "./CataloniaDepartementCode.js"
import { RegionMessages } from "../../../../country/region/RegionMessages.js"
import { lleidaMessages_fr } from "./lleida/LleidaMessages_fr.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"

const cataloniaDepartementsMessageList: { [key in CataloniaDepartementCode]: DepartmentMessages<any> } = {
  [CataloniaDepartementCode.Lleida]: lleidaMessages_fr
}
export const cataloniaMessages_fr = RegionMessages.create("Catalogne",
  cataloniaDepartementsMessageList)
