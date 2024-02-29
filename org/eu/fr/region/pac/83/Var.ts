import { Department } from "../../../../../country/region/department/Department"
import { Place } from "../../../../../../place/Place"
import { PacaDepartementCode } from "../PacaDepartementCode"
import { paca } from "../Paca"

export const Var = new Department(PacaDepartementCode.Var, paca, Place.fromDMS("43°30′N,6°20′E"))
