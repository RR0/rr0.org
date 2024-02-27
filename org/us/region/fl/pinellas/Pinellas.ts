import { Department } from "../../../../country/region/department/Department"
import { UsaDepartementCode } from "../../UsaDepartementCode"
import { Place } from "../../../../../place/Place"
import { florida } from "../Florida"

export const pinellas = new Department(UsaDepartementCode.pinellas, florida, Place.fromDMS("27°54′N 82°44′W"))
