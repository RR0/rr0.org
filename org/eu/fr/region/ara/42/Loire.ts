import { Department } from "../../../../../country/region/department/Department"
import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes"

export const loire = new Department(FranceDepartementCode.Loire, auvergneRhoneAlpes,
  Place.fromDMS("45° 26′ 23″N, 4° 23′ 16″E"))
