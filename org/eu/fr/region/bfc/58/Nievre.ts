import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { bourgogneFrancheComte } from "../BourgogneFrancheComte.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const nievre = Department.create(FranceDepartementCode.Nievre, bourgogneFrancheComte,
  Place.fromDMS("46°40′N,5°40′E"))
