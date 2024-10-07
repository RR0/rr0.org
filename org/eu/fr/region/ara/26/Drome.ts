import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const drome = Department.create(FranceDepartementCode.Drome, auvergneRhoneAlpes, Place.fromDMS("44°45′N,5°10′E"))
