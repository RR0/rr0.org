import { Department } from "../../../../../country/region/department/Department"
import { regions } from "../../../../../country/region/RegionService"
import { Place } from "../../../../../../place/Place"
import { PacaDepartementCode } from "../PacaDepartementCode"

export let vaucluse = new Department(PacaDepartementCode.Vaucluse, regions.paca, Place.fromDMS("44°00′N,5°10′E"))
