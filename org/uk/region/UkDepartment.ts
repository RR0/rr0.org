import { UkDepartementCode } from "./UkDepartementCode"
import { Region } from "../../country/region/Region"
import { Place } from "../../../place/Place"
import { Department } from "../../country/region/department/Department"

export function ukDepartment(code: UkDepartementCode, region: Region, place: Place) {
  return Department.create(code, region, place)
}
