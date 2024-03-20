import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes"
import { Department } from "../../../../../country/region/department/Department"

export const ain = Department.create(FranceDepartementCode.Ain, auvergneRhoneAlpes,
  Place.fromDMS("46°05′00″N,5°20′00″E"))
