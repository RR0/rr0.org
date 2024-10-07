import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "../../../../../place/Place.js"
import { indiana } from "../Indiana.js"
import { Department } from "../../../../country/region/department/Department.js"

export const whitleyCounty = Department.create(UsaCountyCode.whitley, indiana, Place.fromDMS("41°08′N 85°30′W"))
