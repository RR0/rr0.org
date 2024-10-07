import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "../../../../../place/Place.js"
import { michigan } from "../Michigan.js"
import { Department } from "../../../../country/region/department/Department.js"

export const kalamazoo = Department.create(UsaCountyCode.kalamazoo, michigan, Place.fromDMS("42°14′N,85°32′W"))
