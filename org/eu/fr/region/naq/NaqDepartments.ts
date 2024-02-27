import { Place } from "../../../../../place/Place"
import { Department } from "../../../../country/region/department/Department"
import { regions } from "../../../../country/region/RegionService"
import { NaqDepartmentCode } from "./NaqDepartmentCode"

export const naqDepartments = {
  Creuse: new Department(NaqDepartmentCode.Creuse, regions.naq, Place.fromLocation(46.189722, 2.085556))
}
