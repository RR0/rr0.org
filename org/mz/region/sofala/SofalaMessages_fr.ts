import { RegionMessages } from "../../../country/region/RegionMessages.js"
import { SofalaDepartmentCityList } from "./SofalaMessages.js"
import { beiraCityCode } from "./beira/Beira.js"
import { OrganizationType } from "../../../Organization.js"
import { beiraMessages } from "./beira/BeiraMessages.js"

export const sofalaMessages_fr = new RegionMessages(["Sofala"])
const cities: SofalaDepartmentCityList = {
  [beiraCityCode]: beiraMessages
}
sofalaMessages_fr[OrganizationType.city] = cities
