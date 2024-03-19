import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { Department } from "../../../../country/region/department/Department"
import { delaware } from "../Delaware"

export const geneva = Department.create(UsaCountyCode.geneva, delaware, Place.fromLocation(48, 0.316667))
