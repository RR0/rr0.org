import { Place } from "../../../../../place/Place.js"
import { NebraskaCountyCode } from "../NebraskaCountyCode.js"
import { Department } from "../../../../country/region/department/Department.js"
import { nebraska } from "../Nebraska.js"

export const scottsbluffCounty = Department.create(NebraskaCountyCode.Scottsbluff, nebraska,
  Place.fromDMS("41°51′00″N,103°42′36″W"))
