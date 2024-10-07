import { Place } from "../../../../../../place/Place.js"
import { PacaDepartementCode } from "../PacaDepartementCode.js"
import { paca } from "../Paca.js"
import { Department } from "../../../../../country/region/department/Department.js"

export let vaucluse = Department.create(PacaDepartementCode.Vaucluse, paca, Place.fromDMS("44°00′N,5°10′E"))
