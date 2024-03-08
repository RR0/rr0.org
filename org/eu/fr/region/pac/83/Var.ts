import { Place } from "../../../../../../place/Place"
import { PacaDepartementCode } from "../PacaDepartementCode"
import { paca } from "../Paca"
import { Department } from "../../../../../country/region/department/Department"

export const Var = Department.create(PacaDepartementCode.Var, paca, Place.fromDMS("43°30′N,6°20′E"))
