import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { occitanie } from "../Occitanie"
import { Department } from "../../../../../country/region/department/Department"

export const gard = new Department(FranceDepartementCode.Gard, occitanie, Place.fromDMS(`43°59′N,4°08′E`))
