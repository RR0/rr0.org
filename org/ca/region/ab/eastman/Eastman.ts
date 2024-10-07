import { Place } from "../../../../../place/Place.js"
import { Department } from "../../../../country/region/department/Department.js"
import { alberta } from "../Alberta.js"
import { CanadaDepartementCode } from "../../CanadaDepartementCode.js"

export const eastman = Department.create(CanadaDepartementCode.eastman, alberta, Place.fromDMS("49°48′41″N,96°21′30″O"))
