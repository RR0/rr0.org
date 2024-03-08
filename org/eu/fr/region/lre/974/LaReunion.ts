import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { laReunion } from "../LaReunion"
import { Department } from "../../../../../country/region/department/Department"

export const laReunion974 = Department.create(FranceDepartementCode.LaReunion, laReunion,
  Place.fromDMS(`21°06′52″S,55°31′57″E`))
