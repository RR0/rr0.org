import { Department } from "../../../../../country/region/department/Department"
import { NormandieDepartmentCode } from "../NormandieDepartmentCode"
import { normandie } from "../Normandie"
import { Place } from "../../../../../../place/Place"

export const calvados = new Department(NormandieDepartmentCode.Calvados, normandie, Place.fromLocation(49.033333, 0.25))
