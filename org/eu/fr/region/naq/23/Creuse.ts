import { Department } from "../../../../../country/region/department/Department"
import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { nouvelleAquitaine } from "../NouvelleAquitaine"

export const creuse = new Department(NouvelleAquitaineDepartmentCode.Creuse, nouvelleAquitaine,
  Place.fromLocation(46.189722, 2.085556))
