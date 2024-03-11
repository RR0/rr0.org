import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { ileDeFrance } from "../Idf"
import { Department } from "../../../../../country/region/department/Department"

export const seineEtMarne = Department.create(FranceDepartementCode.SeineEtMarne, ileDeFrance,
  Place.fromDMS("48°36′N,3°00′E"))
