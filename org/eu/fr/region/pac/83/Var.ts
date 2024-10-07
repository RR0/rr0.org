import { Place } from "../../../../../../place/Place.js"
import { PacaDepartementCode } from "../PacaDepartementCode.js"
import { paca } from "../Paca.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const Var = Department.create(PacaDepartementCode.Var, paca, Place.fromDMS("43°30′N,6°20′E"))
