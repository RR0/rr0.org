import { Place } from "../../../../../../place/Place"
import { Department } from "../../../../../country/region/department/Department"
import { SpainDepartementCode } from "../../SpainDepartementCode"
import { catalonia } from "../Catalonia"

export const lleida = Department.create(SpainDepartementCode.Lerida, catalonia, Place.fromDMS("46°25′N,3°10′E"))
