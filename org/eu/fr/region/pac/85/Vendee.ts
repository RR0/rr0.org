import { Place } from "../../../../../../place/Place"
import { PacaDepartementCode } from "../PacaDepartementCode"
import { paca } from "../Paca"
import { Department } from "../../../../../country/region/department/Department"

export let vendee = Department.create(PacaDepartementCode.Vendee, paca, Place.fromDMS("46°40′14″N,1°25′36″W"))
