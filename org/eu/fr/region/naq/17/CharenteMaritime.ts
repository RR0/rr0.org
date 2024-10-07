import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode.js"
import { Place } from "../../../../../../place/Place.js"
import { nouvelleAquitaine } from "../NouvelleAquitaine.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const charenteMaritime = Department.create(NouvelleAquitaineDepartmentCode.CharenteMaritime,
  nouvelleAquitaine, Place.fromDMS("45° 45′N, 0° 45′O"))
