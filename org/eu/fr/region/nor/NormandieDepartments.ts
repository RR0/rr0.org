import { Place } from "../../../../../place/Place"
import { Department } from "../../../../country/region/department/Department"
import { FranceDepartementCode } from "../FranceDepartementCode"
import { normandie } from "./Normandie"

export const normandieDepartments: Department[] = [
  new Department(FranceDepartementCode.Calvados, normandie, Place.fromLocation(49.033333, 0.25))
]
