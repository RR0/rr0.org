import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { ileDeFrance } from "../Idf"
import { Department } from "../../../../../country/region/department/Department"

export const oise = Department.create(FranceDepartementCode.Oise, ileDeFrance, Place.fromLocation(49.383333, 2.416667))
