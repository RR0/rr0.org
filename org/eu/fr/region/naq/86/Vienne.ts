import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { nouvelleAquitaine } from "../NouvelleAquitaine"
import { Department } from "../../../../../country/region/department/Department"

export const vienne = Department.create(NouvelleAquitaineDepartmentCode.Vienne, nouvelleAquitaine,
  Place.fromDMS("46°30′N,0°30′E"))
