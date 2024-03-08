import { Place } from "../../../../../../place/Place"
import { PacaDepartementCode } from "../PacaDepartementCode"
import { paca } from "../Paca"
import { Department } from "../../../../../country/region/department/Department"

export let alpesDeHauteProvence = Department.create(PacaDepartementCode.AlpesDeHauteProvence, paca,
  Place.fromDMS("44°00′N,6°10′E"))
