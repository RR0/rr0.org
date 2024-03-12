import { gisborneCityMessages } from "./gisborne/GisborneMessages"
import { OrganizationMessages } from "../../../OrganizationMessages"
import { OrganizationType } from "../../../Organization"
import { GisborneCityCode } from "./GisborneCityCode"

export const gisborneMessages_en = new OrganizationMessages("Gisborne District", "East Coast", "Eastland")
gisborneMessages_en[OrganizationType.city] = {
  [GisborneCityCode.Gisborne]: gisborneCityMessages
}
