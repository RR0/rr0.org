import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { bourgogneFrancheComte } from "../BourgogneFrancheComte"
import { Department } from "../../../../../country/region/department/Department"

export const nievre = Department.create(FranceDepartementCode.Nievre, bourgogneFrancheComte,
  Place.fromDMS("46°40′N,5°40′E"))
