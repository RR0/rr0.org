import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { occitanie } from "../Occitanie"
import { Department } from "../../../../../country/region/department/Department"

export const hauteGaronne = Department.create(FranceDepartementCode.HauteGaronne, occitanie,
  Place.fromDMS(`43°26′N,1°08′E`))
