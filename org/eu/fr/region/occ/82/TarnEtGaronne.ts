import { Department } from "../../../../../country/region/department/Department"
import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { occitanie } from "../Occitanie"

export const tarnEtGaronne = new Department(FranceDepartementCode.TarnEtGaronne, occitanie,
  Place.fromDMS(`43°38′N,3°15′E`))
