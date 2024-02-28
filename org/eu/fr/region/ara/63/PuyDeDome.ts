import { Department } from "../../../../../country/region/department/Department"
import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes"

export const puyDeDome = new Department(FranceDepartementCode.PuyDeDome, auvergneRhoneAlpes,
  Place.fromDMS("45° 42′N, 3° 13′E"))
