import { HautsDeFranceDepartmentCode } from "../HautsDeFranceDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { hautsDeFrance } from "../HautsDeFrance"
import { Department } from "../../../../../country/region/department/Department"

export const pasDeCalais = Department.create(HautsDeFranceDepartmentCode.PasDeCalais, hautsDeFrance,
  Place.fromDMS("50°23′N,3°19′E"))
