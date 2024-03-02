import { lyon69Messages } from "./lyon/Lyon69Messages"
import { RhoneCityCode } from "./RhoneCityCode"
import { belleville69Messages } from "./belleville/BellevilleMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { OrganizationType } from "../../../../../Organization"

export const rhoneMessages = new OrganizationMessages("Rhône")
rhoneMessages[OrganizationType.city] = {
  [RhoneCityCode.Lyon]: lyon69Messages,
  [RhoneCityCode.Belleville]: belleville69Messages
}
