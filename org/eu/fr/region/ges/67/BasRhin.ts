import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { grandEst } from "../GrandEst"
import { Department } from "../../../../../country/region/department/Department"

export const basRhin = Department.create(FranceDepartementCode.BasRhin, grandEst, Place.fromDMS(`48°40′N,7°35′E`))
