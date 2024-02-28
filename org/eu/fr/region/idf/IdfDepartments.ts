import { Place } from "../../../../../place/Place"
import { Department } from "../../../../country/region/department/Department"
import { FranceDepartementCode } from "../FranceDepartementCode"
import { hautsDeSeine } from "./92/HautsDeSeine"
import { ileDeFrance } from "./Idf"

export const idfDepartments: Department[] = [
  hautsDeSeine,
  new Department(FranceDepartementCode.Oise, ileDeFrance, Place.fromLocation(49.383333, 2.416667))
]
