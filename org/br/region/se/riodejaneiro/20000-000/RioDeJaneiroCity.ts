import { Place } from "../../../../../../place/Place"
import { rioDeJaneiro } from "../RioDeJaneiro"
import { RioDeJaneiroCityCode } from "../RioDeJaneiroCityCode"
import { Organization, OrganizationType } from "../../../../../Organization"

export let rioDeJaneiroCity = new Organization(
  RioDeJaneiroCityCode.RioDeJaneiro,
  [Place.fromDMS("15°47′38″S,47°52′58″W")],
  OrganizationType.city,
  rioDeJaneiro
)
