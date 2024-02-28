import { Department } from "../../../../../country/region/department/Department"
import { regions } from "../../../../../country/region/RegionService"
import { Place } from "../../../../../../place/Place"
import { PacaDepartementCode } from "../PacaDepartementCode"

export let hautesAlpes = new Department(PacaDepartementCode.HautesAlpes, regions.paca,
  Place.fromLocation(44.666667, 6.333333))
