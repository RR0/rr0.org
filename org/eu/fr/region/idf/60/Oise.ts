import { Department } from "../../../../../country/region/department/Department"
import { FranceDepartementCode } from "../../FranceDepartementCode"
import { ileDeFrance } from "../Idf"
import { Place } from "../../../../../../place/Place"

export const oise = new Department(FranceDepartementCode.Oise, ileDeFrance, Place.fromLocation(49.383333, 2.416667))
