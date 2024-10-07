import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { ileDeFrance } from "../Idf.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const essonne = Department.create(FranceDepartementCode.Essonne, ileDeFrance,
  Place.fromDMS("48°37′45″N,2°26′02″E"))
