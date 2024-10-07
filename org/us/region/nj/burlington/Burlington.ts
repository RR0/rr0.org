import { Place } from "../../../../../place/Place.js"
import { NewJerseyCountyCode } from "../NewJerseyCountyCode.js"
import { Department } from "../../../../country/region/department/Department.js"
import { newJersey } from "../NewJersey.js"

export const burlington = Department.create(NewJerseyCountyCode.Burlington, newJersey,
  Place.fromLocation(39.88, -74.67))
