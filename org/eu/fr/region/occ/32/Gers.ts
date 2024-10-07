import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { occitanie } from "../Occitanie.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const gers = Department.create(FranceDepartementCode.Gers, occitanie, Place.fromDMS(`43°43′57″N,0°36′12″E`))
