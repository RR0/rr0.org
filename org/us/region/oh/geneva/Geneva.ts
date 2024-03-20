import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { Department } from "../../../../country/region/department/Department"
import { ohio } from "../Ohio"

export const geneva = Department.create(UsaCountyCode.geneva, ohio, Place.fromLocation(48, 0.316667))
