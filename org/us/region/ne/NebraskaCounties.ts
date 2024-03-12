import { Place } from "../../../../place/Place"
import { Department } from "../../../country/region/department/Department"
import { NebraskaCountyCode } from "./NebraskaCountyCode"
import { nebraska } from "./Nebraska"

export const nebraskaCounties: Department[] = [
  Department.create(NebraskaCountyCode.Scottsbluff, nebraska, Place.fromDMS("35°30′N,80°00′W"))
]
