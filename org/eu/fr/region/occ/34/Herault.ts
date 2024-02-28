import { Department } from "../../../../../country/region/department/Department"
import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { occitanie } from "../Occitanie"

export const herault = new Department(FranceDepartementCode.Herault, occitanie, Place.fromDMS(`43° 38′N, 3° 15′E`))
