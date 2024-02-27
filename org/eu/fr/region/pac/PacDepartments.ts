import { Place } from "../../../../../place/Place"
import { regions } from "../../../../country/region/RegionService"
import { Department } from "../../../../country/region/department/Department"
import { PacDepartementCode } from "./PacVilleMessagesList"

export const pacDepartments = {
  HautesAlpes: new Department(PacDepartementCode.HautesAlpes, regions.paca, Place.fromLocation(44.666667, 6.333333))
}
