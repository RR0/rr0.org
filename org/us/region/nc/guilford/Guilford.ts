import { Place } from "../../../../../place/Place.js"
import { NorthCarolinaCountyCode } from "../NorthCarolinaCountyCode.js"
import { Department } from "../../../../country/region/department/Department.js"
import { northCarolina } from "../NorthCarolina.js"

export const guilford = Department.create(NorthCarolinaCountyCode.guilford, northCarolina,
  Place.fromDMS("36°05′N,79°47′W"))
