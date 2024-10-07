import { Department } from "../../../../../country/region/department/Department.js"
import { southSavo } from "../SouthSavo.js"
import { Place } from "../../../../../../place/Place.js"
import { SouthSavoDepartmentCode } from "../SouthSavoDepartmentCode.js"

export const pieksamakiDep = Department.create(SouthSavoDepartmentCode.Pieksamaki, southSavo,
  Place.fromDMS("63°27′24″N,29°40′05″E"))
