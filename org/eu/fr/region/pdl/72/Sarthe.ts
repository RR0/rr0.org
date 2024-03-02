import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { paysDeLoire } from "../PaysDeLoire"
import { franceDepartment } from "../../FranceDepartments"

export const sarthe = franceDepartment(FranceDepartementCode.Sarthe, paysDeLoire, Place.fromLocation(48, 0.316667))
