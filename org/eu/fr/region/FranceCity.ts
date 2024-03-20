import { Place } from "../../../../place/Place"
import { Organization } from "../../../Organization"
import { departmentService } from "../../../country/region/department/DepartmentService"
import assert from "assert"
import { City } from "../../../country/region/department/city/City"

export function franceCity(code: number, place: Place): Organization {
  const depCode = String(Math.floor(code / 1000)).padStart(2, "0")
  const dep = departmentService.get(depCode, undefined)
  assert.ok(dep, `Could not find department with code "${code}"`)
  return City.create(String(code), dep, place)
}
