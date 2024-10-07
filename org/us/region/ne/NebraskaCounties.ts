import { Place } from "../../../../place/Place.js"
import { Department } from "../../../country/region/department/Department.js"
import { NebraskaCountyCode } from "./NebraskaCountyCode.js"
import { nebraska } from "./Nebraska.js"

export const nebraskaCounties: Department[] = [
  Department.create(NebraskaCountyCode.Scottsbluff, nebraska, Place.fromDMS("35°30′N,80°00′W"))
]
