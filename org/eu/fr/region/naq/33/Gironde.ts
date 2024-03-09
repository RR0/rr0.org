import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { nouvelleAquitaine } from "../NouvelleAquitaine"
import { Department } from "../../../../../country/region/department/Department"

export const gironde = Department.create(NouvelleAquitaineDepartmentCode.Gironde,
  nouvelleAquitaine, Place.fromDMS("44°50′14″N,0°35′12″O"))
