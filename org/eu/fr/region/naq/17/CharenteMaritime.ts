import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { nouvelleAquitaine } from "../NouvelleAquitaine"
import { Department } from "../../../../../country/region/department/Department"

export const charenteMaritime = Department.create(NouvelleAquitaineDepartmentCode.CharenteMaritime,
  nouvelleAquitaine, Place.fromDMS("45° 45′N, 0° 45′O"))
