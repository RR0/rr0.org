import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes"

export const loire = new Organization(FranceDepartementCode.Loire, [Place.fromDMS("45°26′23″N,4°23′16″E")],
  OrganizationType.department, auvergneRhoneAlpes)
