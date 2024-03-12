import { RegionMessages } from "../../../country/region/RegionMessages"
import { SofalaDepartmentCityList } from "./SofalaMessages"
import { beiraCityCode } from "./beira/Beira"
import { OrganizationType } from "../../../Organization"
import { beiraMessages } from "./beira/BeiraMessages"

export const sofalaMessages_fr = new RegionMessages(["Sofala"])
const cities: SofalaDepartmentCityList = {
  [beiraCityCode]: beiraMessages
}
sofalaMessages_fr[OrganizationType.city] = cities
