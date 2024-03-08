import { Department } from "../../../../../country/region/department/Department"
import { FinlandDepartementCode } from "../../FinlandDepartementCode"
import { pirkanmaa } from "../Pirkanmaa"
import { Place } from "../../../../../../place/Place"

export const nwp = Department.create(FinlandDepartementCode.nwp, pirkanmaa, Place.fromDMS("63°27′24″N,29°40′05″E"))
