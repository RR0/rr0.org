import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { oklahoma } from "../Oklahoma"
import { Department } from "../../../../country/region/department/Department"

export const kalamazoo = Department.create(UsaCountyCode.kalamazoo, oklahoma, Place.fromDMS("42°14′N,85°32′W"))
