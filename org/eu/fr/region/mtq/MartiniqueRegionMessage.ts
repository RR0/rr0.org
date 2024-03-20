import { RegionMessages } from "../../../../country/region/RegionMessages"
import { MartiniqueDepartementCode } from "./MartiniqueDepartementCode"
import { DepartmentMessages } from "../../../../country/region/department/DepartmentMessages"
import { martinique972Messages } from "./972/MartiniqueMessages"

const laReunionDepartmentsMessages_en: { [key in MartiniqueDepartementCode]: DepartmentMessages<any> } = {
  [MartiniqueDepartementCode.Martinique]: martinique972Messages
}
export const martiniqueRegionMessage = RegionMessages.create<{ [key in MartiniqueDepartementCode]: DepartmentMessages<any> }>(
  "Martinique", laReunionDepartmentsMessages_en
)
