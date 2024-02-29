import { Department } from "../../../../../country/region/department/Department"
import { FranceDepartementCode } from "../../FranceDepartementCode"
import { ileDeFrance } from "../Idf"
import { Place } from "../../../../../../place/Place"

export const paris = new Department(FranceDepartementCode.Paris, ileDeFrance, Place.fromDMS("48°51′24″N,2°21′07″E"))
