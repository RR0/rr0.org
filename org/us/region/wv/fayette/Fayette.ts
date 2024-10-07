import { Place } from "../../../../../place/Place.js"
import { westVirginia } from "../WestVirginia.js"
import { Department } from "../../../../country/region/department/Department.js"
import { WestVirginiaCountyCode } from "../WestVirginiaCountyCode.js"

export const fayette = Department.create(WestVirginiaCountyCode.fayette, westVirginia, Place.fromDMS("38°02′N,81°05′W"))
