import { Department } from "../../../../../country/region/department/Department"
import { Place } from "../../../../../../place/Place"
import { PacaDepartementCode } from "../PacaDepartementCode"
import { paca } from "../Paca"

export let alpesMaritimes = new Department(PacaDepartementCode.AlpesMaritimes, paca,
  Place.fromDMS("43° 50′N, 7° 10′E"))
