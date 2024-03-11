import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { ileDeFrance } from "../Idf"
import { Department } from "../../../../../country/region/department/Department"

export const essonne = Department.create(FranceDepartementCode.Essonne, ileDeFrance,
  Place.fromDMS("48°37′45″N,2°26′02″E"))
