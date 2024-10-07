import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode.js"
import { Place } from "../../../../../../place/Place.js"
import { nouvelleAquitaine } from "../NouvelleAquitaine.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const vienne = Department.create(NouvelleAquitaineDepartmentCode.Vienne, nouvelleAquitaine,
  Place.fromDMS("46°30′N,0°30′E"))
