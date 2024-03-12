import { Place } from "../../../../../place/Place"
import { BrazilDepartementCode } from "../../BrazilDepartementCode"
import { southEast } from "../SouthEast"
import { Department } from "../../../../country/region/department/Department"

export const rioDeJaneiro = Department.create(BrazilDepartementCode.rioDeJaneiro, southEast,
  Place.fromDMS(`47°03′N,122°07′W`)
)
