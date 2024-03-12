import { Place } from "../../../../../place/Place"
import { westVirginia } from "../WestVirginia"
import { Department } from "../../../../country/region/department/Department"
import { WestVirginiaCountyCode } from "../WestVirginiaCountyCode"

export const mason = Department.create(WestVirginiaCountyCode.mason, westVirginia, Place.fromDMS("38°02′N,81°05′W"))
