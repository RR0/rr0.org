import { gisborneCityMessages } from "./gisborne/GisborneMessages"
import { OrganizationMessages } from "../../../OrganizationMessages"
import { OrganizationType } from "../../../Organization"
import { GisborneCityCode } from "./GisborneCityCode"

export const gisborneMessages_fr = new OrganizationMessages("Gisborne", "East Coast", "Eastland")
gisborneMessages_fr[OrganizationType.city] = {
  [GisborneCityCode.Gisborne]: gisborneCityMessages
}
