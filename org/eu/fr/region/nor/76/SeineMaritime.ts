import { NormandieDepartmentCode } from "../NormandieDepartmentCode"
import { normandie } from "../Normandie"
import { Place } from "../../../../../../place/Place"
import { Department } from "../../../../../country/region/department/Department"

export const seineMaritime = Department.create(NormandieDepartmentCode.SeineMaritime, normandie,
  Place.fromDMS("49°40′N,0°50′E"))
