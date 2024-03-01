import { Department } from "../../../../country/region/department/Department"
import { Place } from "../../../../../place/Place"
import { BrazilDepartementCode } from "../../BrazilDepartementCode"
import { centralWest } from "../CentralWest"

export const federalDistrict = new Department(BrazilDepartementCode.federalDistrict, centralWest,
  Place.fromDMS(`47°03′N,122°07′W`))
