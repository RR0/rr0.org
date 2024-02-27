import { Department } from "../../../../../country/region/department/Department"
import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { regions } from "../../../../../country/region/RegionService"

export const hautsDeSeine = new Department(FranceDepartementCode.HautsDeSeine, regions.ileDeFrance,
  Place.fromLocation(48.83333, 2.2))
