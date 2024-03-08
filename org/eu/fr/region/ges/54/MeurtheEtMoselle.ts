import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { grandEst } from "../GrandEst"
import { Department } from "../../../../../country/region/department/Department"

export const meurtheEtMoselle = Department.create(FranceDepartementCode.MeurtheEtMoselle, grandEst,
  Place.fromDMS(`48°40′N,6°10′E`))
