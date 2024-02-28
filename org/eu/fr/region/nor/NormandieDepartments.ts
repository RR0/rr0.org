import { Place } from "../../../../../place/Place"
import { regions } from "../../../../country/region/RegionService"
import { Department } from "../../../../country/region/department/Department"
import { FranceDepartementCode } from "../FranceDepartementCode"

export const normandieDepartments: Department[] = [
  new Department(FranceDepartementCode.Calvados, regions.normandie, Place.fromLocation(49.033333, 0.25))
]
