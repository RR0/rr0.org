import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { occitanie } from "../Occitanie"
import { Department } from "../../../../../country/region/department/Department"

export const herault = Department.create(FranceDepartementCode.Herault, occitanie, Place.fromDMS(`43°38′N,3°15′E`))
