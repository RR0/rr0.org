import { Place } from "../../../../../place/Place"
import { Department } from "../../../../country/region/department/Department"
import { alberta } from "../Alberta"
import { CanadaDepartementCode } from "../../CanadaDepartementCode"

export const eastman = Department.create(CanadaDepartementCode.eastman, alberta, Place.fromDMS("49°48′41″N,96°21′30″O"))
