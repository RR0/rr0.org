import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { occitanie } from "../Occitanie"
import { Department } from "../../../../../country/region/department/Department"

export const hautesPyrenees = Department.create(FranceDepartementCode.HautesPyrenees, occitanie,
  Place.fromDMS(`43° 12′ N, 0° 08′E`))
