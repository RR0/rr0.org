import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { Department } from "../../../../country/region/department/Department"
import { maine } from "../Maine"

export const geneva = Department.create(UsaCountyCode.geneva, maine, Place.fromLocation(48, 0.316667))
