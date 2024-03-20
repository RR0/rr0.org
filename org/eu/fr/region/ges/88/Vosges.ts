import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { grandEst } from "../GrandEst"
import { Department } from "../../../../../country/region/department/Department"

export const vosges = Department.create(FranceDepartementCode.Vosges, grandEst, Place.fromDMS(`48° 10′N, 6° 25′E`))
