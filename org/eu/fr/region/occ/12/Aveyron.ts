import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { occitanie } from "../Occitanie"
import { Department } from "../../../../../country/region/department/Department"

export const aveyron = Department.create(FranceDepartementCode.Aveyron, occitanie,
  Place.fromDMS(`44°31′13″N,2°45′45″E`))
