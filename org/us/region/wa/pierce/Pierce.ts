import { Department } from "../../../../country/region/department/Department"
import { UsaDepartementCode } from "../../UsaDepartementCode"
import { Place } from "../../../../../place/Place"
import { washington } from "../Washington"

export const pierce = new Department(UsaDepartementCode.pierce, washington, Place.fromDMS("47°03′N 122°07′W"))
