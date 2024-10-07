import { gisborneCityMessages } from "./gisborne/GisborneMessages.js"
import { OrganizationMessages } from "../../../OrganizationMessages.js"
import { OrganizationType } from "../../../Organization.js"
import { GisborneCityCode } from "./GisborneCityCode.js"

export const gisborneMessages_fr = new OrganizationMessages("Gisborne", "East Coast", "Eastland")
gisborneMessages_fr[OrganizationType.city] = {
  [GisborneCityCode.Gisborne]: gisborneCityMessages
}
