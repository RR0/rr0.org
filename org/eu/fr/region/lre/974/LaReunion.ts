import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { laReunion } from "../LaReunion.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const laReunion974 = Department.create(FranceDepartementCode.LaReunion, laReunion,
  Place.fromDMS(`21°06′52″S,55°31′57″E`))
