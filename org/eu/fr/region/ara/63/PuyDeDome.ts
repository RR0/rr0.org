import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes"
import { Department } from "../../../../../country/region/department/Department"

export const puyDeDome = Department.create(FranceDepartementCode.PuyDeDome,
  auvergneRhoneAlpes, Place.fromDMS("45°42′N,3°13′E"))
