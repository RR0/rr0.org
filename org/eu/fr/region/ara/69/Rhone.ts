import { Department } from "../../../../../country/region/department/Department"
import { FranceDepartementCode } from "../../FranceDepartementCode"
import { franceRegions } from "../../IleDeFrance"
import { Place } from "../../../../../../place/Place"

export const rhone = new Department(FranceDepartementCode.Rhone, franceRegions.ara, Place.fromLocation(48, 0.316667))
