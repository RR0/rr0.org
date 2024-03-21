import { Department } from "../../../../../country/region/department/Department"
import { southSavo } from "../SouthSavo"
import { Place } from "../../../../../../place/Place"
import { SouthSavoDepartmentCode } from "../SouthSavoDepartmentCode"

export const pieksamakiDep = Department.create(SouthSavoDepartmentCode.Pieksamaki, southSavo,
  Place.fromDMS("63°27′24″N,29°40′05″E"))
