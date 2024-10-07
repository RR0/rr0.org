import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "../../../../../place/Place.js"
import { virginIslands } from "../VirginIslands.js"
import { Department } from "../../../../country/region/department/Department.js"

export const stThomas = Department.create(UsaCountyCode.stThomas, virginIslands, Place.fromDMS("18°20′00″N,64°55′00″W"))
