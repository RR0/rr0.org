import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { bourgogneFrancheComte } from "../BourgogneFrancheComte"
import { Department } from "../../../../../country/region/department/Department"

export const yonne = Department.create(FranceDepartementCode.Yonne, bourgogneFrancheComte,
  Place.fromDMS("47° 50′N, 3° 30′E"))
