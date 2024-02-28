import { Department } from "../../../country/region/department/Department"
import { Place } from "../../../../place/Place"
import { FinlandDepartementCode } from "./FinlandDepartementCode"
import { northKarelia } from "./nk/NorthKarelia"

export const finlandDepartments = {
  pk: new Department(FinlandDepartementCode.pk, northKarelia, Place.fromDMS("63° 27′ 24″ N, 29° 40′ 05″ E"))
}
