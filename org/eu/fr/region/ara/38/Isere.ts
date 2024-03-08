import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes"
import { Department } from "../../../../../country/region/department/Department"

export const isere = Department.create(FranceDepartementCode.Isere, auvergneRhoneAlpes, Place.fromDMS("45°20′N,5°30′E"))
