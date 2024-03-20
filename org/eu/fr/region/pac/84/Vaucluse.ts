import { Place } from "../../../../../../place/Place"
import { PacaDepartementCode } from "../PacaDepartementCode"
import { paca } from "../Paca"
import { Department } from "../../../../../country/region/department/Department"

export let vaucluse = Department.create(PacaDepartementCode.Vaucluse, paca, Place.fromDMS("44°00′N,5°10′E"))
