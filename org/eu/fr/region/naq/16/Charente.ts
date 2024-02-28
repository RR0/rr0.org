import { Department } from "../../../../../country/region/department/Department"
import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { nouvelleAquitaine } from "../NouvelleAquitaine"

export const charente = new Department(NouvelleAquitaineDepartmentCode.Charente, nouvelleAquitaine,
  Place.fromDMS("45° 50′N, 0° 20′E"))
