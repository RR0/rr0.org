import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "../../../../../place/Place.js"
import { missouri } from "../Missouri.js"
import { Department } from "../../../../country/region/department/Department.js"

export const kalamazoo = Department.create(UsaCountyCode.kalamazoo, missouri, Place.fromDMS("42°14′N,85°32′W"))
