import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { texas } from "../Texas"
import { Department } from "../../../../country/region/department/Department"

export const tarrant = Department.create(UsaCountyCode.tarrant, texas, Place.fromDMS("32°46′N 97°17′W"))
