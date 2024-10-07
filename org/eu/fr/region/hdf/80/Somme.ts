import { HautsDeFranceDepartmentCode } from "../HautsDeFranceDepartmentCode.js"
import { Place } from "../../../../../../place/Place.js"
import { hautsDeFrance } from "../HautsDeFrance.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const somme = Department.create(HautsDeFranceDepartmentCode.Somme, hautsDeFrance,
  Place.fromDMS("49°53′N,2°25′E"))
