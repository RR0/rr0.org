import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "../../../../../place/Place.js"
import { alabama } from "../Alabama.js"
import { Department } from "../../../../country/region/department/Department.js"

export const geneva = Department.create(UsaCountyCode.geneva, alabama, Place.fromLocation(48, 0.316667))
