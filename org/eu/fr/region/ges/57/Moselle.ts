import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { grandEst } from "../GrandEst"
import { Department } from "../../../../../country/region/department/Department"

export const moselle = Department.create(FranceDepartementCode.Moselle, grandEst, Place.fromDMS(`49°02′02″N,6°39′43″E`))
