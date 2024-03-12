import { NewSouthWalesCityCode } from "./NewSouthWalesCityCode"
import { dunmoreNswMessages } from "./dunmore/DunmoreMessages"
import { OrganizationMessages } from "../../../OrganizationMessages"
import { OrganizationType } from "../../../Organization"

export const newSouthWales_fr = new OrganizationMessages("Nouvelle-Galles du Sud")
newSouthWales_fr[OrganizationType.city] = {
  [NewSouthWalesCityCode.Dunmore]: dunmoreNswMessages
}
