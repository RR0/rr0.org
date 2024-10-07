import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode.js"
import { Place } from "../../../../../../place/Place.js"
import { nouvelleAquitaine } from "../NouvelleAquitaine.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const pyreneesAtlantiques = Department.create(NouvelleAquitaineDepartmentCode.PyreneesAtlantiques,
  nouvelleAquitaine,
  Place.fromDMS("43°15′N,0°50′W"))
