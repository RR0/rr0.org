import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { paysDeLoire } from "../PaysDeLoire.js"
import { franceDepartment } from "../../FranceDepartments.js"

export const sarthe = franceDepartment(FranceDepartementCode.Sarthe, paysDeLoire, Place.fromLocation(48, 0.316667))
