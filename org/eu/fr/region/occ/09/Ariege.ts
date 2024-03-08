import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { occitanie } from "../Occitanie"
import { Department } from "../../../../../country/region/department/Department"

export const ariege = Department.create(FranceDepartementCode.Ariege, occitanie, Place.fromDMS(`43°00′N,1°30′E`))
