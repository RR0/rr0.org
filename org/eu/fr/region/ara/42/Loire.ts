import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const loire = Department.create(FranceDepartementCode.Loire,
  auvergneRhoneAlpes, Place.fromDMS("45°26′23″N,4°23′16″E"))
