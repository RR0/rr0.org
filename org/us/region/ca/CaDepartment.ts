import { Place } from "../../../../place/Place"
import { Department } from "../../../country/region/department/Department"
import { usaRegions } from "../UsaRegions"

export function caDepartment(code: string, place: Place): Department {
  return new Department(code, usaRegions.california, place)
}
