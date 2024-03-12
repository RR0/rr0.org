import { RegionMessages } from "../../../country/region/RegionMessages"
import { arlington_en } from "./arlington/Arlington_en"
import { OrganizationType } from "../../../Organization"
import { bristolCityCode } from "./bristol/Bristol"
import { bristolMessages } from "./bristol/BristolMessages"

export const virginia_en = RegionMessages.create("Virginia state", {
  arlington: arlington_en
})
virginia_en[OrganizationType.city] = {
  [bristolCityCode]: bristolMessages
}
