import { Place } from "../../../../../place/Place"
import { Department } from "../../../../country/region/department/Department"
import { virginia } from "../Virginia"
import { VirginiaCountyCode } from "../VirginiaCountyCode"

export const arlington = Department.create(VirginiaCountyCode.arlington, virginia, Place.fromDMS("38°02′N,81°05′W"))
