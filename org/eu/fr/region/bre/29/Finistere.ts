import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { bretagne } from "../Bretagne.js"
import { franceDepartment } from "../../FranceDepartments.js"

export const finistere = franceDepartment(FranceDepartementCode.Finistere, bretagne, Place.fromDMS("48°15′N,4°00′W"))
