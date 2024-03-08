import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes"
import { Department } from "../../../../../country/region/department/Department"

export const drome = Department.create(FranceDepartementCode.Drome, auvergneRhoneAlpes, Place.fromDMS("44°45′N,5°10′E"))
