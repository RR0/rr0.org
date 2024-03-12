import { Place } from "../../../../../place/Place"
import { NewJerseyCountyCode } from "../NewJerseyCountyCode"
import { Department } from "../../../../country/region/department/Department"
import { newJersey } from "../NewJersey"

export const burlington = Department.create(NewJerseyCountyCode.Burlington, newJersey,
  Place.fromLocation(39.88, -74.67))
