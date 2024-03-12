import { RegionMessages } from "../../../country/region/RegionMessages"
import { OrganizationType } from "../../../Organization"
import { SofalaDepartmentCityList } from "./SofalaMessages"
import { beiraCityCode } from "./beira/Beira"
import { beiraMessages } from "./beira/BeiraMessages"

export const sofalaMessages_en = new RegionMessages(["Sofala"])
const cities: SofalaDepartmentCityList = {
  [beiraCityCode]: beiraMessages
}
sofalaMessages_en[OrganizationType.city] = cities
