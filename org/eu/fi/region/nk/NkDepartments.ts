import { Place } from "../../../../../place/Place"
import { Department } from "../../../../country/region/department/Department"
import { FinlandDepartementCode } from "../FinlandDepartementCode"
import { northKarelia } from "./NorthKarelia"

export const nkDepartments: Department[] = [
  new Department(FinlandDepartementCode.pk, northKarelia, Place.fromLocation(48, 0.316667))
]
