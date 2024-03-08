import { Place } from "../../../../../../place/Place"
import { PacaDepartementCode } from "../PacaDepartementCode"
import { paca } from "../Paca"
import { Department } from "../../../../../country/region/department/Department"

export let alpesMaritimes = Department.create(PacaDepartementCode.AlpesMaritimes, paca, Place.fromDMS("43°50′N,7°10′E"))
