import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { grandEst } from "../GrandEst.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const moselle = Department.create(FranceDepartementCode.Moselle, grandEst, Place.fromDMS(`49°02′02″N,6°39′43″E`))
