import { FranceDepartementCode } from "../../FranceDepartementCode.js"
import { Place } from "../../../../../../place/Place.js"
import { guadeloupeRegion } from "../GuadeloupeRegion.js"
import { Department } from "../../../../../country/region/department/Department.js"

export const guadeloupe = Department.create(FranceDepartementCode.Guadeloupe, guadeloupeRegion,
  Place.fromDMS(`16°15′34″N,61°33′38″O`))
