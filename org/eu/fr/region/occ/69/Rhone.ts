import { Department } from "../../../../../country/region/department/Department"
import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes"

export const rhone = new Department(FranceDepartementCode.Rhone, auvergneRhoneAlpes, Place.fromLocation(48, 0.316667))
