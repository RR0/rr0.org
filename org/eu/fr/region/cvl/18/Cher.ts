import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { centreValDeLoire } from "../CentreValDeLoire"
import { franceDepartment } from "../../FranceDepartments"

export const cher = franceDepartment(FranceDepartementCode.Cher, centreValDeLoire, Place.fromDMS("47°00′N,2°35′E"))
