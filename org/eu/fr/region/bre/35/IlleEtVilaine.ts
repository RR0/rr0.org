import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { bretagne } from "../Bretagne"
import { franceDepartment } from "../../FranceDepartments"

export const illeEtVilaine = franceDepartment(FranceDepartementCode.IlleEtVilaine, bretagne,
  Place.fromDMS("48°10′N,1°40′W"))
