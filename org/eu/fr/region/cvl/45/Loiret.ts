import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { centreValDeLoire } from "../CentreValDeLoire"
import { franceDepartment } from "../../FranceDepartments"

export const loiret = franceDepartment(FranceDepartementCode.Loiret, centreValDeLoire, Place.fromDMS("47°55′N,2°10′E"))
