import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { centreValDeLoire } from "../CentreValDeLoire"
import { franceDepartment } from "../../FranceDepartments"

export const indre = franceDepartment(FranceDepartementCode.Indre, centreValDeLoire, Place.fromDMS("46°46′N,1°36′E"))
