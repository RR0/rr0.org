import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { wyoming } from "../Wyoming"
import { Department } from "../../../../country/region/department/Department"

export const uintah = Department.create(UsaCountyCode.uintah, wyoming, Place.fromDMS("40°08′N,109°31′W"))
