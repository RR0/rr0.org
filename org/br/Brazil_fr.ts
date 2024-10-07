import { centralWestMessages_fr } from "./region/cw/CentralWestMessages_fr.js"
import { OrganizationType } from "../Organization.js"
import { OrganizationMessages } from "../OrganizationMessages.js"
import { southEastMessages_fr } from "./region/se/SouthEastMessages_fr.js"

export const brazil_fr = new OrganizationMessages("Brésil")
brazil_fr[OrganizationType.region] = {
  cw: centralWestMessages_fr,
  se: southEastMessages_fr
}
