import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { centreValDeLoire } from "../CentreValDeLoire.js"
import { franceDepartment } from "../../FranceDepartments.js"

export const indreEtLoire = franceDepartment(FranceDepartementCode.IndreEtLoire, centreValDeLoire,
  Place.fromDMS("47°25′22″N,0°50′39″E"))
