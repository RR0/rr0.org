import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { paysDeLoire } from "../PaysDeLoire.js"
import { franceDepartment } from "../../FranceDepartments.js"

export const mayenne = franceDepartment(FranceDepartementCode.Mayenne, paysDeLoire, Place.fromDMS("48° 10′N,0°40′W"))
