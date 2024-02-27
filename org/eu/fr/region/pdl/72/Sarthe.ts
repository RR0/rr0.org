import { Department } from "../../../../../country/region/department/Department"
import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { paysDeLoire } from "../PaysDeLoire"

export const sarthe = new Department(FranceDepartementCode.Sarthe, paysDeLoire, Place.fromLocation(48, 0.316667))
