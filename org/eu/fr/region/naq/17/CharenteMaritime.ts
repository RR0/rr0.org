import { Department } from "../../../../../country/region/department/Department"
import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { nouvelleAquitaine } from "../NouvelleAquitaine"

export const charenteMaritime = new Department(NouvelleAquitaineDepartmentCode.CharenteMaritime, nouvelleAquitaine,
  Place.fromDMS("45° 45′N, 0° 45′O"))
