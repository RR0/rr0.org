import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { bretagne } from "../Bretagne"
import { franceDepartment } from "../../FranceDepartments"

export const cotesDArmor = franceDepartment(FranceDepartementCode.CotesDArmor, bretagne,
  Place.fromDMS("48°20′N,2°50′W"))
