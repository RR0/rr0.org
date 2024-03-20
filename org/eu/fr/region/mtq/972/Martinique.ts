import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { martiniqueRegion } from "../MartiniqueRegion"
import { Department } from "../../../../../country/region/department/Department"

export const martinique972 = Department.create(FranceDepartementCode.Martinique, martiniqueRegion,
  Place.fromDMS(`14°39′00″N,61°00′54″W`))
