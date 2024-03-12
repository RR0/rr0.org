import { centralWestMessages_en } from "./region/cw/CentralWestMessages_en"
import { OrganizationType } from "../Organization"
import { OrganizationMessages } from "../OrganizationMessages"
import { southEastMessages_en } from "./region/se/SouthEastMessages_en"

export const brazil_en = new OrganizationMessages("Brazil")
brazil_en[OrganizationType.region] = {
  cw: centralWestMessages_en,
  se: southEastMessages_en
}
