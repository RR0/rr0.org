import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { massachusetts } from "../Massachusetts"
import { Department } from "../../../../country/region/department/Department"

export const middlesex = Department.create(UsaCountyCode.middlesex, massachusetts, Place.fromDMS("42°29′N,71°23′W"))
