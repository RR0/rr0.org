import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "../../../../../place/Place.js"
import { Department } from "../../../../country/region/department/Department.js"
import { delaware } from "../Delaware.js"

export const geneva = Department.create(UsaCountyCode.geneva, delaware, Place.fromLocation(48, 0.316667))
