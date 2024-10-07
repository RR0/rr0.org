import { RegionMessages } from "../../../country/region/RegionMessages.js"
import { OrganizationType } from "../../../Organization.js"
import { SofalaDepartmentCityList } from "./SofalaMessages.js"
import { beiraCityCode } from "./beira/Beira.js"
import { beiraMessages } from "./beira/BeiraMessages.js"

export const sofalaMessages_en = new RegionMessages(["Sofala"])
const cities: SofalaDepartmentCityList = {
  [beiraCityCode]: beiraMessages
}
sofalaMessages_en[OrganizationType.city] = cities
