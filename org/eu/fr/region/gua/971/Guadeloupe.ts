import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { guadeloupeRegion } from "../GuadeloupeRegion"
import { Department } from "../../../../../country/region/department/Department"

export const guadeloupe = Department.create(FranceDepartementCode.Guadeloupe, guadeloupeRegion,
  Place.fromDMS(`16°15′34″N,61°33′38″O`))
