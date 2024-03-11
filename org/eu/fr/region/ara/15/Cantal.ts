import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes"
import { Department } from "../../../../../country/region/department/Department"

export const cantal = Department.create(FranceDepartementCode.Cantal, auvergneRhoneAlpes,
  Place.fromDMS("45°02′00″N,3°06′00″E"))
