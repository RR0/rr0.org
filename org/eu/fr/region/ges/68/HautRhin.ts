import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { grandEst } from "../GrandEst.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const hautRhin = Department.create(FranceDepartementCode.HautRhin, grandEst, Place.fromDMS(`47°45′N,7°15′E`))
