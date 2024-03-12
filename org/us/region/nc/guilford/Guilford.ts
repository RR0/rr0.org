import { Place } from "../../../../../place/Place"
import { NorthCarolinaCountyCode } from "../NorthCarolinaCountyCode"
import { Department } from "../../../../country/region/department/Department"
import { northCarolina } from "../NorthCarolina"

export const guilford = Department.create(NorthCarolinaCountyCode.guilford, northCarolina,
  Place.fromDMS("36°05′N,79°47′W"))
