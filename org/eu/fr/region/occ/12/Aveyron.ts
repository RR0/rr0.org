import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { occitanie } from "../Occitanie.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const aveyron = Department.create(FranceDepartementCode.Aveyron, occitanie,
  Place.fromDMS(`44°31′13″N,2°45′45″E`))
