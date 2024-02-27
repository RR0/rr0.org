import { Department } from "../../../../country/region/department/Department"
import { UsaDepartementCode } from "../../UsaDepartementCode"
import { Place } from "../../../../../place/Place"
import { pennsylvania } from "../Pennsylvania"

export const westmoreland = new Department(UsaDepartementCode.westmoreland, pennsylvania,
  Place.fromDMS("40°19′N 79°28′W"))
