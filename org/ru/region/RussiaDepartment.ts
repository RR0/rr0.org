import { RussiaDepartementCode } from "./RussiaDepartementCode"
import { Region } from "../../country/region/Region"
import { Place } from "../../../place/Place"
import { Department } from "../../country/region/department/Department"

export function russiaDepartment(code: RussiaDepartementCode, region: Region, place: Place) {
  return Department.create(code, region, place)
}
