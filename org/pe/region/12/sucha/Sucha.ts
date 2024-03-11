import { Place } from "../../../../../../place/Place"
import { Department } from "../../../../../country/region/department/Department"
import { lesserPoland } from "../LesserPoland"
import { PeruDepartementCode } from "../../PeruDepartementCode"

export const sucha = new Department(PeruDepartementCode.Sucha, lesserPoland,
  Place.fromDMS("49°44′25″N,19°35′19″E"))
