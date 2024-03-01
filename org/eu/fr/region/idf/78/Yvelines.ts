import { Department } from "../../../../../country/region/department/Department"
import { FranceDepartementCode } from "../../FranceDepartementCode"
import { ileDeFrance } from "../Idf"
import { Place } from "../../../../../../place/Place"

export const yvelines = new Department(FranceDepartementCode.Yvelines, ileDeFrance, Place.fromDMS(`48°50′N,1°55′E`))
