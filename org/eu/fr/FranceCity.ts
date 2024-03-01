import { Place } from "../../../place/Place"
import { City } from "../../country/region/department/city/City"
import { departmentService } from "../../country/region/department/DepartmentService"
import assert from "assert"

export function franceCity(zipCode: number, place: Place): City {
  const depCode = String(Math.floor(zipCode / 1000)).padStart(2, "0")
  const dep = departmentService.get(depCode, undefined)
  assert.ok(dep, `Could not find department with code "${zipCode}"`)
  return new City(String(zipCode), place, dep)
}
