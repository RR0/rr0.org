import { Department } from "../../../../../country/region/department/Department"
import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes"

export const allier = new Department(FranceDepartementCode.Allier, auvergneRhoneAlpes, Place.fromDMS("46°25′N,3°10′E"))
