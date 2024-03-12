import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { washington } from "../Washington"
import { Department } from "../../../../country/region/department/Department"

export const pierce = Department.create(UsaCountyCode.pierce, washington, Place.fromDMS("47°03′N 122°07′W"))
