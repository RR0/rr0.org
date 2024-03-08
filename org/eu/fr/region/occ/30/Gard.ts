import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { occitanie } from "../Occitanie"
import { Department } from "../../../../../country/region/department/Department"

export const gard = Department.create(FranceDepartementCode.Gard, occitanie, Place.fromDMS(`43°59′N,4°08′E`))
