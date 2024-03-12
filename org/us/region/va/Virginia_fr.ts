import { RegionMessages } from "../../../country/region/RegionMessages"
import { arlington_fr } from "./arlington/Arlington_fr"
import { OrganizationType } from "../../../Organization"
import { bristolCityCode } from "./bristol/Bristol"
import { bristolMessages } from "./bristol/BristolMessages"

export const virginia_fr = RegionMessages.create("État de Virginie", {
  arlington: arlington_fr
})
virginia_fr[OrganizationType.city] = {
  [bristolCityCode]: bristolMessages
}
