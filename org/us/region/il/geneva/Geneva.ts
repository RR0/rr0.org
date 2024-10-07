import { UsaCountyCode } from "../../UsaCountyCode.js"
import { Place } from "../../../../../place/Place.js"
import { Department } from "../../../../country/region/department/Department.js"
import { illinois } from "../Illinois.js"

export const geneva = Department.create(UsaCountyCode.geneva, illinois, Place.fromLocation(48, 0.316667))
