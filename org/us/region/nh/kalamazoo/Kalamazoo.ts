import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { newHampshire } from "../NewHampshire"
import { Department } from "../../../../country/region/department/Department"

export const kalamazoo = Department.create(UsaCountyCode.kalamazoo, newHampshire, Place.fromDMS("42°14′N,85°32′W"))
