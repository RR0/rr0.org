import { Department } from "../../../../../country/region/department/Department"
import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { occitanie } from "../Occitanie"

export const tarn = new Department(FranceDepartementCode.Tarn, occitanie, Place.fromDMS(`43°49′N,2°12′E`))
