import { OrganizationMessages } from "../../../../OrganizationMessages.js"
import { OrganizationType } from "../../../../Organization.js"
import { NorthJutlandCityCode } from "./NorthJutlandCityCode.js"
import { NorthJutlandMessages } from "./NorthJutlandMessages.js"
import { aalborgMessages } from "./aalborg/AalborgMessages.js"

const northJutlandCityMessages: NorthJutlandMessages = {
  [NorthJutlandCityCode.Aalborg]: aalborgMessages
}
export const northJutland_en = new OrganizationMessages("North Jutland")
northJutland_en[OrganizationType.city] = northJutlandCityMessages
