import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "../../../../../place/Place.js"
import { maryland } from "../Maryland.js"
import { Department } from "../../../../country/region/department/Department.js"

export const geneva = Department.create(UsaCountyCode.geneva, maryland, Place.fromLocation(48, 0.316667))
