import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "../../../../../place/Place.js"
import { arkansas } from "../Arkansas.js"
import { Department } from "../../../../country/region/department/Department.js"

export const geneva = Department.create(UsaCountyCode.geneva, arkansas, Place.fromLocation(48, 0.316667))
