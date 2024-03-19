import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { Department } from "../../../../country/region/department/Department"
import { illinois } from "../Illinois"

export const geneva = Department.create(UsaCountyCode.geneva, illinois, Place.fromLocation(48, 0.316667))
