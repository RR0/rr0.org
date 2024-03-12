import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { alabama } from "../Alabama"
import { Department } from "../../../../country/region/department/Department"

export const geneva = Department.create(UsaCountyCode.geneva, alabama, Place.fromLocation(48, 0.316667))
