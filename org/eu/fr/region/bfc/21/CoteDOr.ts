import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { bourgogneFrancheComte } from "../BourgogneFrancheComte"
import { Department } from "../../../../../country/region/department/Department"

export const coteDOr = Department.create(FranceDepartementCode.CoteDOr, bourgogneFrancheComte,
  Place.fromDMS("47°25′N,4°50′E"))
