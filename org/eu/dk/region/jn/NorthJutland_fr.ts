import { OrganizationMessages } from "../../../../OrganizationMessages"
import { OrganizationType } from "../../../../Organization"
import { NorthJutlandCityCode } from "./NorthJutlandCityCode"
import { aalborgMessages } from "./aalborg/AalborgMessages"
import { NorthJutlandMessages } from "./NorthJutlandMessages"

const northJutlandCityMessages: NorthJutlandMessages = {
  [NorthJutlandCityCode.Aalborg]: aalborgMessages
}
export const northJutland_fr = new OrganizationMessages("Jutland du Nord")
northJutland_fr[OrganizationType.city] = northJutlandCityMessages
