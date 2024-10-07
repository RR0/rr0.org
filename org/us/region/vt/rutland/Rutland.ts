import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "../../../../../place/Place.js"
import { vermont } from "../Vermont.js"
import { Department } from "../../../../country/region/department/Department.js"

export const rutlandCounty = Department.create(UsaCountyCode.rutland, vermont, Place.fromDMS("43°34′48″N 73°02′12″W"))
