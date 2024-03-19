import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { colorado } from "../Colorado"
import { Department } from "../../../../country/region/department/Department"

export const geneva = Department.create(UsaCountyCode.geneva, colorado, Place.fromLocation(48, 0.316667))
