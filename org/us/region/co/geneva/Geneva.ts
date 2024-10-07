import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "../../../../../place/Place.js"
import { colorado } from "../Colorado.js"
import { Department } from "../../../../country/region/department/Department.js"

export const geneva = Department.create(UsaCountyCode.geneva, colorado, Place.fromLocation(48, 0.316667))
