import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes"
import { Department } from "../../../../../country/region/department/Department"

export const ardeche = Department.create(FranceDepartementCode.Ardeche, auvergneRhoneAlpes,
  Place.fromDMS("44°40′N,4°25′E"))
