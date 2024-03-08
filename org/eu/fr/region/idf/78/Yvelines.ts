import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { ileDeFrance } from "../Idf"
import { Department } from "../../../../../country/region/department/Department"

export const yvelines = Department.create(FranceDepartementCode.Yvelines, ileDeFrance, Place.fromDMS(`48°50′N,1°55′E`))
