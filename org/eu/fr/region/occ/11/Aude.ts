import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { occitanie } from "../Occitanie"
import { Department } from "../../../../../country/region/department/Department"

export const aude = Department.create(FranceDepartementCode.Aude, occitanie, Place.fromDMS(`43°05′N,2°25′E`))
