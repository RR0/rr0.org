import { Department } from "../../../../../country/region/department/Department"
import { regions } from "../../../../../country/region/RegionService"
import { Place } from "../../../../../../place/Place"
import { PacaDepartementCode } from "../PacaDepartementCode"

export let alpesMaritimes = new Department(PacaDepartementCode.AlpesMaritimes, regions.paca,
  Place.fromDMS("43° 50′N, 7° 10′E"))
