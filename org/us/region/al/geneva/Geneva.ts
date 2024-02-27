import { Department } from "../../../../country/region/department/Department"
import { UsaDepartementCode } from "../../UsaDepartementCode"
import { Place } from "../../../../../place/Place"
import { alabama } from "../Alabama"

export const geneva = new Department(UsaDepartementCode.geneva, alabama, Place.fromLocation(48, 0.316667))
