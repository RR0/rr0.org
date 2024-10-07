import { OrganizationMessages } from "../../../../OrganizationMessages.js"
import { OrganizationType } from "../../../../Organization.js"
import { NorthJutlandCityCode } from "./NorthJutlandCityCode.js"
import { aalborgMessages } from "./aalborg/AalborgMessages.js"
import { NorthJutlandMessages } from "./NorthJutlandMessages.js"

const northJutlandCityMessages: NorthJutlandMessages = {
  [NorthJutlandCityCode.Aalborg]: aalborgMessages
}
export const northJutland_fr = new OrganizationMessages("Jutland du Nord")
northJutland_fr[OrganizationType.city] = northJutlandCityMessages
