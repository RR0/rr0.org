import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes"
import { Department } from "../../../../../country/region/department/Department"

export const savoie = Department.create(FranceDepartementCode.Savoie, auvergneRhoneAlpes,
  Place.fromDMS("45°35′00″N,6°20′00″E"))
