import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { centreValDeLoire } from "../CentreValDeLoire.js"
import { franceDepartment } from "../../FranceDepartments.js"

export const cher = franceDepartment(FranceDepartementCode.Cher, centreValDeLoire, Place.fromDMS("47°00′N,2°35′E"))
