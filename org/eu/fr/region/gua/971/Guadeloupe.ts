import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { guadeloupe } from "../Guadeloupe"
import { Department } from "../../../../../country/region/department/Department"

export const guadeloupe971 = Department.create(FranceDepartementCode.Guadeloupe, guadeloupe,
  Place.fromDMS(`16°15′34″N,61°33′38″O`))
