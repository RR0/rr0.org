import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { nouvelleAquitaine } from "../NouvelleAquitaine"
import { Department } from "../../../../../country/region/department/Department"

export const correze = Department.create(NouvelleAquitaineDepartmentCode.Correze,
  nouvelleAquitaine, Place.fromDMS("45°20′N,1°50′E"))
