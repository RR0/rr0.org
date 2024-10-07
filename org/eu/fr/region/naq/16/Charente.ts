import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode.js"
import { Place } from "../../../../../../place/Place.js"
import { nouvelleAquitaine } from "../NouvelleAquitaine.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const charente = Department.create(NouvelleAquitaineDepartmentCode.Charente,
  nouvelleAquitaine, Place.fromDMS("45° 50′N, 0° 20′E"))
