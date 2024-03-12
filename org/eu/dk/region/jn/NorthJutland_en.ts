import { OrganizationMessages } from "../../../../OrganizationMessages"
import { OrganizationType } from "../../../../Organization"
import { NorthJutlandCityCode } from "./NorthJutlandCityCode"
import { NorthJutlandMessages } from "./NorthJutlandMessages"
import { aalborgMessages } from "./aalborg/AalborgMessages"

const northJutlandCityMessages: NorthJutlandMessages = {
  [NorthJutlandCityCode.Aalborg]: aalborgMessages
}
export const northJutland_en = new OrganizationMessages("North Jutland")
northJutland_en[OrganizationType.city] = northJutlandCityMessages
