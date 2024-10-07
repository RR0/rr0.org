import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { bourgogneFrancheComte } from "../BourgogneFrancheComte.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const morbihan = Department.create(FranceDepartementCode.Morbihan, bourgogneFrancheComte,
  Place.fromDMS("47° 50′N, 2° 50′W"))
