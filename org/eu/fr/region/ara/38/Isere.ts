import { FranceDepartementCode } from "../../FranceDepartementCode"
import { Place } from "../../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../../Organization"
import { auvergneRhoneAlpes } from "../AuvergneRhoneAlpes"

export const isere = new Organization(FranceDepartementCode.Isere, [Place.fromDMS("45°20′N,5°30′E")],
  OrganizationType.department, auvergneRhoneAlpes)
