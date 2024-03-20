import { HautsDeFranceDepartmentCode } from "../HautsDeFranceDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { hautsDeFrance } from "../HautsDeFrance"
import { Department } from "../../../../../country/region/department/Department"

export const aisne = Department.create(HautsDeFranceDepartmentCode.Aisne, hautsDeFrance,
  Place.fromDMS("49°49′29″N,3°42′36″E"))
