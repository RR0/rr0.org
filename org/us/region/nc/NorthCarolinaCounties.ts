import { Place } from "../../../../place/Place.js"
import { Department } from "../../../country/region/department/Department.js"
import { NorthCarolinaCountyCode } from "./NorthCarolinaCountyCode.js"
import { northCarolina } from "./NorthCarolina.js"

export const northCarolinaCounties: Department[] = [
  Department.create(NorthCarolinaCountyCode.guilford, northCarolina, Place.fromDMS("35°30′N,80°00′W"))
]
