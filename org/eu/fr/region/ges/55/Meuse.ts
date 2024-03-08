import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { grandEst } from "../GrandEst"
import { Department } from "../../../../../country/region/department/Department"

export const meuse = Department.create(FranceDepartementCode.Meuse, grandEst, Place.fromDMS(`48°40′N,6°10′E`))
