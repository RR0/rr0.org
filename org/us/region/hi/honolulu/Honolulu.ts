import { Place } from "../../../../../place/Place.js"
import { hawaii } from "../Hawaii.js"
import { Department } from "../../../../country/region/department/Department.js"
import { HawaiiCountyCode } from "../HawaiiCountyCode.js"

export const honolulu = Department.create(HawaiiCountyCode.Honolulu, hawaii, Place.fromDMS("38°02′N,81°05′W"))
