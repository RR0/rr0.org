import { Department } from "../../../../../country/region/department/Department.js"
import { FinlandDepartementCode } from "../../FinlandDepartementCode.js"
import { pirkanmaa } from "../Pirkanmaa.js"
import { Place } from "../../../../../../place/Place.js"

export const nwp = Department.create(FinlandDepartementCode.nwp, pirkanmaa, Place.fromDMS("63°27′24″N,29°40′05″E"))
