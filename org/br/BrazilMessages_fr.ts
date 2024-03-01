import { centralWestMessages_fr } from "./region/cw/CentralWestMessages_fr"
import { OrganizationType } from "../Organization"
import { OrganizationMessages } from "../OrganizationMessages"
import { southEastMessages_fr } from "./region/se/SouthEastMessages_fr"

export const brazilMessages_fr = new OrganizationMessages("Brésil")
brazilMessages_fr[OrganizationType.region] = {
  cw: centralWestMessages_fr,
  se: southEastMessages_fr
}
