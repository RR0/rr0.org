import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const savoie = Department.create(FranceDepartementCode.Savoie, auvergneRhoneAlpes,
  Place.fromDMS("45°35′00″N,6°20′00″E"))
