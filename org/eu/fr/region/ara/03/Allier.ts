import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const allier = Department.create(FranceDepartementCode.Allier, auvergneRhoneAlpes,
  Place.fromDMS("46°25′N,3°10′E"))
