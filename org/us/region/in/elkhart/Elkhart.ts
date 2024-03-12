import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { indiana } from "../Indiana"
import { Department } from "../../../../country/region/department/Department"

export const elkhartCounty = Department.create(UsaCountyCode.elkhart, indiana, Place.fromDMS("41°36′N,85°52′W"))
