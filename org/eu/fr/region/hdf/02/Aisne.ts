import { HautsDeFranceDepartmentCode } from "../HautsDeFranceDepartmentCode.js"
import { Place } from "../../../../../../place/Place.js"
import { hautsDeFrance } from "../HautsDeFrance.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const aisne = Department.create(HautsDeFranceDepartmentCode.Aisne, hautsDeFrance,
  Place.fromDMS("49°49′29″N,3°42′36″E"))
