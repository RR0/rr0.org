import { Place } from "../../../../../place/Place"
import { NebraskaCountyCode } from "../NebraskaCountyCode"
import { Department } from "../../../../country/region/department/Department"
import { nebraska } from "../Nebraska"

export const scottsbluffCounty = Department.create(NebraskaCountyCode.Scottsbluff, nebraska,
  Place.fromDMS("41°51′00″N,103°42′36″W"))
