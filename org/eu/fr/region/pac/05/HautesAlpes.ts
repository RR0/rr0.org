import { Place } from "../../../../../../place/Place"
import { PacaDepartementCode } from "../PacaDepartementCode"
import { paca } from "../Paca"
import { Department } from "../../../../../country/region/department/Department"

export let hautesAlpes = new Department(PacaDepartementCode.HautesAlpes, paca, Place.fromLocation(44.666667, 6.333333))
