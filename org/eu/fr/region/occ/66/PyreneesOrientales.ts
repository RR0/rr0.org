import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { occitanie } from "../Occitanie"
import { Department } from "../../../../../country/region/department/Department"

export const pyreneesOrientales = Department.create(FranceDepartementCode.PyreneesOrientales, occitanie,
  Place.fromDMS(`42°38′N,2°40′E`))
