import { Department } from "../../../../../country/region/department/Department"
import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { nouvelleAquitaine } from "../NouvelleAquitaine"

export const vienne = new Department(NouvelleAquitaineDepartmentCode.Vienne, nouvelleAquitaine,
  Place.fromDMS("46°30′N,0°30′E"))
