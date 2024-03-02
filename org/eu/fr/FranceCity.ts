import { Place } from "../../../place/Place"
import { departmentService } from "../../country/region/department/DepartmentService"
import assert from "assert"
import { Organization } from "../../Organization"
import { City } from "../../country/region/department/city/City"

export function franceCity(zipCode: number, place: Place): Organization {
  const depCode = String(Math.floor(zipCode / 1000)).padStart(2, "0")
  const dep = departmentService.get(depCode, undefined)
  assert.ok(dep, `Could not find department with code "${zipCode}"`)
  return City.create(String(zipCode), dep, place)
}
