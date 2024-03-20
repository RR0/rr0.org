import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { southCarolina } from "../SouthCarolina"
import { Department } from "../../../../country/region/department/Department"

export const kalamazoo = Department.create(UsaCountyCode.kalamazoo, southCarolina, Place.fromDMS("42°14′N,85°32′W"))
