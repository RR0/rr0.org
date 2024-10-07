import { Place } from "../../../../../../place/Place.js"
import { PacaDepartementCode } from "../PacaDepartementCode.js"
import { paca } from "../Paca.js"
import { Department } from "../../../../../country/region/department/Department.js"

export let alpesMaritimes = Department.create(PacaDepartementCode.AlpesMaritimes, paca, Place.fromDMS("43°50′N,7°10′E"))
