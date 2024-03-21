import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { bourgogneFrancheComte } from "../BourgogneFrancheComte"
import { Department } from "../../../../../country/region/department/Department"

export const doubs = Department.create(FranceDepartementCode.Doubs, bourgogneFrancheComte,
  Place.fromDMS("47° 10′ N, 6° 25′E"))
