import { centralWestMessages_en } from "./region/cw/CentralWestMessages_en.js"
import { OrganizationType } from "../Organization.js"
import { OrganizationMessages } from "../OrganizationMessages.js"
import { southEastMessages_en } from "./region/se/SouthEastMessages_en.js"

export const brazil_en = new OrganizationMessages("Brazil")
brazil_en[OrganizationType.region] = {
  cw: centralWestMessages_en,
  se: southEastMessages_en
}
