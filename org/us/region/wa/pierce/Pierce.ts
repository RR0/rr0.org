import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "../../../../../place/Place.js"
import { washington } from "../Washington.js"
import { Department } from "../../../../country/region/department/Department.js"

export const pierce = Department.create(UsaCountyCode.pierce, washington, Place.fromDMS("47°03′N 122°07′W"))
