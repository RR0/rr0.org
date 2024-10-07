import { Place } from "../../../../../../place/Place.js"
import { PacaDepartementCode } from "../PacaDepartementCode.js"
import { paca } from "../Paca.js"
import { Department } from "../../../../../country/region/department/Department.js"

export let alpesDeHauteProvence = Department.create(PacaDepartementCode.AlpesDeHauteProvence, paca,
  Place.fromDMS("44°00′N,6°10′E"))
