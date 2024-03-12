import { RegionMessages } from "../../../country/region/RegionMessages"
import { tarrant_fr } from "./tarrant/Tarrant_fr"
import { houstonCityCode } from "./houston/Houston"
import { houstonMessages } from "./houston/HoustonMessages"
import { OrganizationType } from "../../../Organization"

const texasCityMessages = {
  [houstonCityCode]: houstonMessages
}
export const texas_fr = RegionMessages.create("Texas", {
  tarrant: tarrant_fr
  }
)
texas_fr[OrganizationType.city] = texasCityMessages
