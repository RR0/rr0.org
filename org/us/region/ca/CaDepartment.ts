import { Place } from "../../../../place/Place"
import { Department } from "../../../country/region/department/Department"
import { california } from "./California"

export function caDepartment(code: string, place: Place): Department {
  return new Department(code, california, place)
}
