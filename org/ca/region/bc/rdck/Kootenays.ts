import { Place } from "../../../../../place/Place"
import { britishColumbia } from "../BritishColumbia"
import { Department } from "../../../../country/region/department/Department"
import { BritishColumbiaDepartmentCode } from "../BritishColumbiaDepartmentCode"

export const kootenays = Department.create(BritishColumbiaDepartmentCode.kootenays, britishColumbia,
  Place.fromDMS("50°30′N,116°30′W"))
