import { Place } from "../../../../../place/Place"
import { Department } from "../../../../country/region/department/Department"
import { FinlandDepartementCode } from "../FinlandDepartementCode"
import { finlandRegions } from "../FinlandRegions"

export const nkDepartments = {
  pk: new Department(FinlandDepartementCode.pk, finlandRegions.nk, Place.fromLocation(48, 0.316667))
}
