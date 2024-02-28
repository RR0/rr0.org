import { Department } from "../../../../../country/region/department/Department"
import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { ileDeFrance } from "../Idf"

export const hautsDeSeine = new Department(FranceDepartementCode.HautsDeSeine, ileDeFrance,
  Place.fromLocation(48.83333, 2.2))
