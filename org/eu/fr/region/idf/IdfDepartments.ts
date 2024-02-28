import { Place } from "../../../../../place/Place"
import { Department } from "../../../../country/region/department/Department"
import { regions } from "../../../../country/region/RegionService"
import { FranceDepartementCode } from "../FranceDepartementCode"
import { hautsDeSeine } from "./92/HautsDeSeine"

export const idfDepartments: Department[] = [
  hautsDeSeine,
  new Department(FranceDepartementCode.Oise, regions.ileDeFrance, Place.fromLocation(49.383333, 2.416667))
]
