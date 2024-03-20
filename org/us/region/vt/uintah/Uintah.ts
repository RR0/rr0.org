import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { vermont } from "../Vermont"
import { Department } from "../../../../country/region/department/Department"

export const uintah = Department.create(UsaCountyCode.uintah, vermont, Place.fromDMS("40°08′N,109°31′W"))
