import { Department } from "../../../../../country/region/department/Department"
import { NouvelleAquitaineDepartmentCode } from "../NouvelleAquitaineDepartmentCode"
import { regions } from "../../../../../country/region/RegionService"
import { Place } from "../../../../../../place/Place"

export const landes = new Department(NouvelleAquitaineDepartmentCode.Landes, regions.nouvelleAquitaine,
  Place.fromDMS("44°00′N,0°50′O"))
