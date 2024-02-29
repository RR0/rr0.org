import { Department } from "../../../../../country/region/department/Department"
import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { grandEst } from "../GrandEst"

export const meurtheEtMoselle = new Department(FranceDepartementCode.MeurtheEtMoselle, grandEst,
  Place.fromDMS(`48°40′N,6° 10′E`))
