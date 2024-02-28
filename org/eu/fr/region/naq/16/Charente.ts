import { Department } from "../../../../../country/region/department/Department"
import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode"
import { regions } from "../../../../../country/region/RegionService"
import { Place } from "../../../../../../place/Place"

export const charente = new Department(NouvelleAquitaineDepartmentCode.Charente, regions.nouvelleAquitaine,
  Place.fromDMS("45° 50′N, 0° 20′E"))
