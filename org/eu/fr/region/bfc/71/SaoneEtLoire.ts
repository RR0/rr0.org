import { Department } from "../../../../../country/region/department/Department"
import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { bourgogneFrancheComte } from "../BourgogneFrancheComte"

export const saoneEtLoire = new Department(FranceDepartementCode.SaoneEtLoire, bourgogneFrancheComte,
  Place.fromDMS("46°40′N,4°42′E"))
