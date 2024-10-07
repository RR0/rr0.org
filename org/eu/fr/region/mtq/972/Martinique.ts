import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { martiniqueRegion } from "../MartiniqueRegion.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const martinique972 = Department.create(FranceDepartementCode.Martinique, martiniqueRegion,
  Place.fromDMS(`14°39′00″N,61°00′54″W`))
