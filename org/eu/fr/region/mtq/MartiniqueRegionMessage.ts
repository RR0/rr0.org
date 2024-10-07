import { RegionMessages } from "../../../../country/region/RegionMessages.js"
import { MartiniqueDepartementCode } from "./MartiniqueDepartementCode.js"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages.js"
import { martinique972Messages } from "./972/MartiniqueMessages.js"

const laReunionDepartmentsMessages_en: { [key in MartiniqueDepartementCode]: DepartmentMessages<any> } = {
  [MartiniqueDepartementCode.Martinique]: martinique972Messages
}
export const martiniqueRegionMessage = RegionMessages.create<{ [key in MartiniqueDepartementCode]: DepartmentMessages<any> }>(
  "Martinique", laReunionDepartmentsMessages_en
)
