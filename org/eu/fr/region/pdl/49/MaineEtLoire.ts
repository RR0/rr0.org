import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { paysDeLoire } from "../PaysDeLoire"
import { franceDepartment } from "../../FranceDepartments"

export const maineEtLoire = franceDepartment(FranceDepartementCode.MaineEtLoire, paysDeLoire,
  Place.fromDMS("47°27′N,0°36′O"))
