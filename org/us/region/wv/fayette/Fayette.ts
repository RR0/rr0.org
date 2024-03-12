import { Place } from "../../../../../place/Place"
import { westVirginia } from "../WestVirginia"
import { Department } from "../../../../country/region/department/Department"
import { WestVirginiaCountyCode } from "../WestVirginiaCountyCode"

export const fayette = Department.create(WestVirginiaCountyCode.fayette, westVirginia, Place.fromDMS("38°02′N,81°05′W"))
