import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode.js"
import { Place } from "../../../../../../place/Place.js"
import { nouvelleAquitaine } from "../NouvelleAquitaine.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const gironde = Department.create(NouvelleAquitaineDepartmentCode.Gironde,
  nouvelleAquitaine, Place.fromDMS("44°50′14″N,0°35′12″O"))
