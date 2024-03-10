import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { paysDeLoire } from "../PaysDeLoire"
import { franceDepartment } from "../../FranceDepartments"

export const loireAtlantique = franceDepartment(FranceDepartementCode.LoireAtlantique, paysDeLoire,
  Place.fromDMS("47°20′N,1°40′O"))
