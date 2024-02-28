import { Department } from "../../../../../country/region/department/Department"
import { Place } from "../../../../../../place/Place"
import { PacaDepartementCode } from "../PacaDepartementCode"
import { paca } from "../Paca"

export let vaucluse = new Department(PacaDepartementCode.Vaucluse, paca, Place.fromDMS("44°00′N,5°10′E"))
