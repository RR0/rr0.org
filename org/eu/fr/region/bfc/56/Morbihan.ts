import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { bourgogneFrancheComte } from "../BourgogneFrancheComte"
import { Department } from "../../../../../country/region/department/Department"

export const morbihan = Department.create(FranceDepartementCode.Morbihan, bourgogneFrancheComte,
  Place.fromDMS("47° 50′N, 2° 50′W"))
