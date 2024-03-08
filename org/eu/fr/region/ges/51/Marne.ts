import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { grandEst } from "../GrandEst"
import { Department } from "../../../../../country/region/department/Department"

export const marne = Department.create(FranceDepartementCode.Marne, grandEst, Place.fromDMS(`49°00′N,4°15′E`))
