import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { vermont } from "../Vermont"
import { Department } from "../../../../country/region/department/Department"

export const rutlandCounty = Department.create(UsaCountyCode.rutland, vermont, Place.fromDMS("43°34′48″N 73°02′12″W"))
