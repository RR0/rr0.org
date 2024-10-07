import { RegionMessages } from "../../../country/region/RegionMessages.js"
import { tarrant_fr } from "./tarrant/Tarrant_fr.js"
import { houstonCityCode } from "./houston/Houston.js"
import { houstonMessages } from "./houston/HoustonMessages.js"
import { OrganizationType } from "../../../Organization.js"

const texasCityMessages = {
  [houstonCityCode]: houstonMessages
}
export const texas_fr = RegionMessages.create("Texas", {
  tarrant: tarrant_fr
  }
)
texas_fr[OrganizationType.city] = texasCityMessages
