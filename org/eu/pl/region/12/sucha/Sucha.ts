import { Place } from "../../../../../../place/Place"
import { Department } from "../../../../../country/region/department/Department"
import { lesserPoland } from "../LesserPoland"
import { PolandDepartementCode } from "../../PolandDepartementCode"

export const sucha = Department.create(PolandDepartementCode.Sucha, lesserPoland,
  Place.fromDMS("49°44′25″N,19°35′19″E"))
