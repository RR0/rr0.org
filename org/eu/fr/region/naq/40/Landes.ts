import { Department } from "../../../../../country/region/department/Department"
import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { nouvelleAquitaine } from "../NouvelleAquitaine"

export const landes = new Department(NouvelleAquitaineDepartmentCode.Landes, nouvelleAquitaine,
  Place.fromDMS("44°00′N,0°50′O"))
