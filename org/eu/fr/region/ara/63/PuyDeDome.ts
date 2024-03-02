import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes"

export const puyDeDome = new Organization(FranceDepartementCode.PuyDeDome, [Place.fromDMS("45° 42′N, 3° 13′E")],
  OrganizationType.department, auvergneRhoneAlpes)
