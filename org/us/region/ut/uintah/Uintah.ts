import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { utah } from "../Utah"
import { Department } from "../../../../country/region/department/Department"

export const uintah = Department.create(UsaCountyCode.uintah, utah, Place.fromDMS("40°08′N,109°31′W"))
