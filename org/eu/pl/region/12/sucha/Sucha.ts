import { Place } from "../../../../../../place/Place.js"
import { Department } from "../../../../../country/region/department/Department.js"
import { lesserPoland } from "../LesserPoland.js"
import { PolandDepartementCode } from "../../PolandDepartementCode.js"

export const sucha = Department.create(PolandDepartementCode.Sucha, lesserPoland,
  Place.fromDMS("49°44′25″N,19°35′19″E"))
