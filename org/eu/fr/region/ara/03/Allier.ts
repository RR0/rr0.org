import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes"
import { Department } from "../../../../../country/region/department/Department"

export const allier = Department.create(FranceDepartementCode.Allier, auvergneRhoneAlpes,
  Place.fromDMS("46°25′N,3°10′E"))
