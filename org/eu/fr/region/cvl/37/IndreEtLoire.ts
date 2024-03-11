import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { centreValDeLoire } from "../CentreValDeLoire"
import { franceDepartment } from "../../FranceDepartments"

export const indreEtLoire = franceDepartment(FranceDepartementCode.IndreEtLoire, centreValDeLoire,
  Place.fromDMS("47°25′22″N,0°50′39″E"))
