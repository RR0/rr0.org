import { NewSouthWalesCityCode } from "./NewSouthWalesCityCode.js"
import { dunmoreNswMessages } from "./dunmore/DunmoreMessages.js"
import { OrganizationMessages } from "../../../OrganizationMessages.js"
import { OrganizationType } from "../../../Organization.js"

export const newSouthWales_fr = new OrganizationMessages("Nouvelle-Galles du Sud")
newSouthWales_fr[OrganizationType.city] = {
  [NewSouthWalesCityCode.Dunmore]: dunmoreNswMessages
}
