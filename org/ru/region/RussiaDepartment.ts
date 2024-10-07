import { RussiaDepartementCode } from "./RussiaDepartementCode.js"
import { Region } from "../../country/region/Region.js"
import { Place } from "../../../place/Place.js"
import { Department } from "../../country/region/department/Department.js"

export function russiaDepartment(code: RussiaDepartementCode, region: Region, place: Place) {
  return Department.create(code, region, place)
}
