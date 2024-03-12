import { Place } from "../../../../../place/Place"
import { hawaii } from "../Hawaii"
import { Department } from "../../../../country/region/department/Department"
import { HawaiiCountyCode } from "../HawaiiCountyCode"

export const honolulu = Department.create(HawaiiCountyCode.Honolulu, hawaii, Place.fromDMS("38°02′N,81°05′W"))
