import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { nouvelleAquitaine } from "../NouvelleAquitaine"
import { Department } from "../../../../../country/region/department/Department"

export const dordogne = Department.create(NouvelleAquitaineDepartmentCode.Dordogne,
  nouvelleAquitaine, Place.fromDMS("45° 00′ N, 0° 40′ E"))
