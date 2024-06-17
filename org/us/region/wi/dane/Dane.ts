import { UsaCountyCode } from "../../UsaCountyCode"
import { Place } from "../../../../../place/Place"
import { wisconsin } from "../Wisconsin"
import { Department } from "../../../../country/region/department/Department"

export const dane = Department.create(UsaCountyCode.dane, wisconsin, Place.fromDMS("43°04′N 89°25′W"))
