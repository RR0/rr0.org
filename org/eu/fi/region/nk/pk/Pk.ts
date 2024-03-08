import { Department } from "../../../../../country/region/department/Department"
import { FinlandDepartementCode } from "../../FinlandDepartementCode"
import { northKarelia } from "../NorthKarelia"
import { Place } from "../../../../../../place/Place"

export const pk = Department.create(FinlandDepartementCode.pk, northKarelia,
  Place.fromDMS("63° 27′ 24″ N, 29° 40′ 05″ E"))
