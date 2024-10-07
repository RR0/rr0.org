import { Place } from "../../../../../place/Place.js"
import { BrazilDepartementCode } from "../../BrazilDepartementCode.js"
import { southEast } from "../SouthEast.js"
import { Department } from "../../../../country/region/department/Department.js"

export const rioDeJaneiro = Department.create(BrazilDepartementCode.rioDeJaneiro, southEast,
  Place.fromDMS(`47°03′N,122°07′W`)
)
