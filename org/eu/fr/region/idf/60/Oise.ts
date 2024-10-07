import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { ileDeFrance } from "../Idf.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const oise = Department.create(FranceDepartementCode.Oise, ileDeFrance, Place.fromLocation(49.383333, 2.416667))
