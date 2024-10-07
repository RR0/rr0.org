import { gisborneCityMessages } from "./gisborne/GisborneMessages.js"
import { OrganizationMessages } from "../../../OrganizationMessages.js"
import { OrganizationType } from "../../../Organization.js"
import { GisborneCityCode } from "./GisborneCityCode.js"

export const gisborneMessages_en = new OrganizationMessages("Gisborne District", "East Coast", "Eastland")
gisborneMessages_en[OrganizationType.city] = {
  [GisborneCityCode.Gisborne]: gisborneCityMessages
}
