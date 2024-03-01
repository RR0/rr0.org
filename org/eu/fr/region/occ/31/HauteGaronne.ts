import { Department } from "../../../../../country/region/department/Department"
import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { occitanie } from "../Occitanie"

export const hauteGaronne = new Department(FranceDepartementCode.HauteGaronne, occitanie,
  Place.fromDMS(`43°26′N,1°08′E`))
