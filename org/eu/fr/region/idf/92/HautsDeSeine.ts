import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { ileDeFrance } from "../Idf.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const hautsDeSeine = Department.create(FranceDepartementCode.HautsDeSeine, ileDeFrance,
  Place.fromLocation(48.83333, 2.2))
