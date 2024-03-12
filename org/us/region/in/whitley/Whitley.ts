import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { indiana } from "../Indiana"
import { Department } from "../../../../country/region/department/Department"

export const whitleyCounty = Department.create(UsaCountyCode.whitley, indiana, Place.fromDMS("41°08′N 85°30′W"))
