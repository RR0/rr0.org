import { UkDepartementCode } from "../../UkDepartementCode.js"
import { england } from "../England.js"
import { Place } from "../../../../../place/Place.js"
import { ukDepartment } from "../../UkDepartment.js"

export const sussex = ukDepartment(UkDepartementCode.Sussex, england, Place.fromDMS("47°20′N,1°40′O"))
