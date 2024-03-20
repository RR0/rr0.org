import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { paysDeLoire } from "../PaysDeLoire"
import { franceDepartment } from "../../FranceDepartments"

export const mayenne = franceDepartment(FranceDepartementCode.Mayenne, paysDeLoire, Place.fromDMS("48° 10′N,0°40′W"))
