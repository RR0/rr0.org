import { Place } from "../../../../../../place/Place.js"
import { Department } from "../../../../../country/region/department/Department.js"
import { SpainDepartementCode } from "../../SpainDepartementCode.js"
import { catalonia } from "../Catalonia.js"

export const lleida = Department.create(SpainDepartementCode.Lerida, catalonia, Place.fromDMS("46°25′N,3°10′E"))
