import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { occitanie } from "../Occitanie.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const herault = Department.create(FranceDepartementCode.Herault, occitanie, Place.fromDMS(`43°38′N,3°15′E`))
