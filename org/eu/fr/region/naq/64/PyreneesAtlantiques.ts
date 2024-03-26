import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { nouvelleAquitaine } from "../NouvelleAquitaine"
import { Department } from "../../../../../country/region/department/Department"

export const pyreneesAtlantiques = Department.create(NouvelleAquitaineDepartmentCode.PyreneesAtlantiques,
  nouvelleAquitaine,
  Place.fromDMS("43°15′N,0°50′W"))
