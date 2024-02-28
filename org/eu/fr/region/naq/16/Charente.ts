import { Department } from "../../../../../country/region/department/Department"
import { NaqDepartmentCode } from "../NaqDepartmentCode"
import { regions } from "../../../../../country/region/RegionService"
import { Place } from "../../../../../../place/Place"

export const charente = new Department(NaqDepartmentCode.Charente, regions.nouvelleAquitaine,
  Place.fromDMS("45° 50′N, 0° 20′E"))
