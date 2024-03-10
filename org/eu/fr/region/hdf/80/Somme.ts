import { HautsDeFranceDepartmentCode } from "../HautsDeFranceDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { hautsDeFrance } from "../HautsDeFrance"
import { Department } from "../../../../../country/region/department/Department"

export const somme = Department.create(HautsDeFranceDepartmentCode.Somme, hautsDeFrance,
  Place.fromDMS("49°53′N,2°25′E"))
