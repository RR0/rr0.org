import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { grandEst } from "../GrandEst"
import { Department } from "../../../../../country/region/department/Department"

export const hautRhin = Department.create(FranceDepartementCode.HautRhin, grandEst, Place.fromDMS(`47°45′N,7°15′E`))
