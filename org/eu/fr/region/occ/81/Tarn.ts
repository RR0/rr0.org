import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { occitanie } from "../Occitanie"
import { Department } from "../../../../../country/region/department/Department"

export const tarn = Department.create(FranceDepartementCode.Tarn, occitanie, Place.fromDMS(`43°49′N,2°12′E`))
