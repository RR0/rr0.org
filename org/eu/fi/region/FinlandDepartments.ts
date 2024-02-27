import { Department } from "../../../country/region/department/Department"
import { finlandRegions } from "./FinlandRegions"
import { Place } from "../../../../place/Place"
import { FinlandDepartementCode } from "./FinlandDepartementCode"

export const finlandDepartments = {
  pk: new Department(FinlandDepartementCode.pk, finlandRegions.nk,
    Place.fromDMS("63° 27′ 24″ N, 29° 40′ 05″ E"))
}
