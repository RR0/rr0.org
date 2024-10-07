import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { ileDeFrance } from "../Idf.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const paris = Department.create(FranceDepartementCode.Paris, ileDeFrance, Place.fromDMS("48°51′24″N,2°21′07″E"))
