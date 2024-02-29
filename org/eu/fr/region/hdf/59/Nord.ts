import { Department } from "../../../../../country/region/department/Department"
import { HautsDeFranceDepartmentCode } from "../HautsDeFranceDepartmentCode"
import { Place } from "../../../../../../place/Place"
import { hautsDeFrance } from "../HautsDeFrance"

export const nord = new Department(HautsDeFranceDepartmentCode.Nord, hautsDeFrance, Place.fromDMS("50°23′N,3°19′E"))
