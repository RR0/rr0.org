import { Place } from "../../../../../place/Place.js"
import { Department } from "../../../../country/region/department/Department.js"
import { virginia } from "../Virginia.js"
import { VirginiaCountyCode } from "../VirginiaCountyCode.js"

export const arlington = Department.create(VirginiaCountyCode.arlington, virginia, Place.fromDMS("38°02′N,81°05′W"))
