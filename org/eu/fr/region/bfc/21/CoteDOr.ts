import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { bourgogneFrancheComte } from "../BourgogneFrancheComte.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const coteDOr = Department.create(FranceDepartementCode.CoteDOr, bourgogneFrancheComte,
  Place.fromDMS("47°25′N,4°50′E"))
