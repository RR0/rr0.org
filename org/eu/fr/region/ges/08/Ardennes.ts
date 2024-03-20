import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { grandEst } from "../GrandEst"
import { Department } from "../../../../../country/region/department/Department"

export const ardennes = Department.create(FranceDepartementCode.Ardennes, grandEst, Place.fromDMS(`49° 35′ N, 4° 40′E`))
