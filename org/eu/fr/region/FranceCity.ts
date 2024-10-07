import { Place } from "../../../../place/Place.js"
import { Organization } from "../../../Organization.js"
import { departmentService } from "../../../country/region/department/DepartmentService.js"
import assert from "assert"
import { City } from "../../../country/region/department/city/City.js"

export function franceCity(code: number, place: Place): Organization {
  const depCode = String(Math.floor(code / 1000)).padStart(2, "0")
  const dep = departmentService.get(depCode, undefined)
  assert.ok(dep, `Could not find department with code "${code}"`)
  return City.create(String(code), dep, place)
}
