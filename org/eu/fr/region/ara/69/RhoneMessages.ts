import { lyon69Messages } from "./Lyon/Lyon69Messages.js"
import { RhoneCityCode } from "./RhoneCityCode.js"
import { belleville69Messages } from "./Belleville/BellevilleMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { OrganizationType } from "../../../../../Organization.js"

export const rhoneMessages = new OrganizationMessages("Rhône")
rhoneMessages[OrganizationType.city] = {
  [RhoneCityCode.Lyon]: lyon69Messages,
  [RhoneCityCode.Belleville]: belleville69Messages
}
