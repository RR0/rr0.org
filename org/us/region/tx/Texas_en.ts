import { tarrant_en } from "./tarrant/Tarrant_en.js"
import { RegionMessages } from "../../../country/region/RegionMessages.js"
import { OrganizationType } from "../../../Organization.js"
import { houstonMessages } from "./houston/HoustonMessages.js"
import { houstonCityCode } from "./houston/Houston.js"

const texasCityMessages = {
  [houstonCityCode]: houstonMessages
}
export const texas_en = RegionMessages.create("Texas", {
  tarrant: tarrant_en
  }
)
texas_en[OrganizationType.city] = texasCityMessages
