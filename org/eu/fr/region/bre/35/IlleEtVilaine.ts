import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { bretagne } from "../Bretagne.js"
import { franceDepartment } from "../../FranceDepartments.js"

export const illeEtVilaine = franceDepartment(FranceDepartementCode.IlleEtVilaine, bretagne,
  Place.fromDMS("48°10′N,1°40′W"))
