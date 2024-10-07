import { Place } from "../../../../../../place/Place.js"
import { PacaDepartementCode } from "../PacaDepartementCode.js"
import { paca } from "../Paca.js"
import { Department } from "../../../../../country/region/department/Department.js"

export let vendee = Department.create(PacaDepartementCode.Vendee, paca, Place.fromDMS("46°40′14″N,1°25′36″W"))
