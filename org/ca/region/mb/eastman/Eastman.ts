import { Place } from "../../../../../place/Place"
import { Department } from "../../../../country/region/department/Department"
import { manitoba } from "../Manitoba"
import { CanadaDepartementCode } from "../../CanadaDepartementCode"

export const eastman = Department.create(CanadaDepartementCode.eastman, manitoba,
  Place.fromDMS("49°48′41″N,96°21′30″O"))
