import { Department } from "../../../../../country/region/department/Department"
import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { occitanie } from "../Occitanie"

export const gers = new Department(FranceDepartementCode.Gers, occitanie, Place.fromDMS(`43°43′57″N,0°36′12″E`))
