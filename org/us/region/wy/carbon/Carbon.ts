import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { wyoming } from "../Wyoming"
import { Department } from "../../../../country/region/department/Department"

export const carbon = Department.create(UsaCountyCode.carbon, wyoming, Place.fromDMS("41°41′N 106°56′W"))
