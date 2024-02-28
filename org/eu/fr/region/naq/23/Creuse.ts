import { Department } from "../../../../../country/region/department/Department"
import { NaqDepartmentCode } from "../NaqDepartmentCode"
import { regions } from "../../../../../country/region/RegionService"
import { Place } from "../../../../../../place/Place"

export const creuse = new Department(NaqDepartmentCode.Creuse, regions.nouvelleAquitaine,
  Place.fromLocation(46.189722, 2.085556))
