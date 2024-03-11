import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { ileDeFrance } from "../Idf"
import { Department } from "../../../../../country/region/department/Department"

export const valDOise = Department.create(FranceDepartementCode.ValDOise, ileDeFrance, Place.fromDMS("49°04′N,2°14′E"))
