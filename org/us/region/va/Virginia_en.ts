import { RegionMessages } from "../../../country/region/RegionMessages.js"
import { arlington_en } from "./arlington/Arlington_en.js"
import { OrganizationType } from "../../../Organization.js"
import { bristolCityCode } from "./bristol/Bristol.js"
import { bristolMessages } from "./bristol/BristolMessages.js"

export const virginia_en = RegionMessages.create("Virginia state", {
  arlington: arlington_en
})
virginia_en[OrganizationType.city] = {
  [bristolCityCode]: bristolMessages
}
