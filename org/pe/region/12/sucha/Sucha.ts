import { Place } from "../../../../../../place/Place"
import { Department } from "../../../../../country/region/department/Department"
import { lesserPoland } from "../LesserPoland"
import { PhilippinesDepartementCode } from "../../PhilippinesDepartementCode"

export const sucha = new Department(PhilippinesDepartementCode.Sucha, lesserPoland,
  Place.fromDMS("49°44′25″N,19°35′19″E"))
