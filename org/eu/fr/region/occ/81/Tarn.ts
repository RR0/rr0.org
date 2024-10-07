import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { occitanie } from "../Occitanie.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const tarn = Department.create(FranceDepartementCode.Tarn, occitanie, Place.fromDMS(`43°49′N,2°12′E`))
