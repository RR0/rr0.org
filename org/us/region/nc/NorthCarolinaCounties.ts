import { Place } from "../../../../place/Place"
import { Department } from "../../../country/region/department/Department"
import { NorthCarolinaCountyCode } from "./NorthCarolinaCountyCode"
import { northCarolina } from "./NorthCarolina"

export const northCarolinaCounties: Department[] = [
  Department.create(NorthCarolinaCountyCode.guilford, northCarolina, Place.fromDMS("35°30′N,80°00′W"))
]
