import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { virginIslands } from "../VirginIslands"
import { Department } from "../../../../country/region/department/Department"

export const stThomas = Department.create(UsaCountyCode.stThomas, virginIslands, Place.fromDMS("18°20′00″N,64°55′00″W"))
