import { Place } from "../../../../../../place/Place.js"
import { PacaDepartementCode } from "../PacaDepartementCode.js"
import { paca } from "../Paca.js"
import { Department } from "../../../../../country/region/department/Department.js"

export let hautesAlpes = Department.create(PacaDepartementCode.HautesAlpes, paca,
  Place.fromLocation(44.666667, 6.333333))
