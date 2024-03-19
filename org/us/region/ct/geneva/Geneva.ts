import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { connecticut } from "../Connecticut"
import { Department } from "../../../../country/region/department/Department"

export const geneva = Department.create(UsaCountyCode.geneva, connecticut, Place.fromLocation(48, 0.316667))
