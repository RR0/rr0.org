import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { bretagne } from "../Bretagne"
import { franceDepartment } from "../../FranceDepartments"

export const finistere = franceDepartment(FranceDepartementCode.Finistere, bretagne, Place.fromDMS("48°15′N,4°00′W"))
