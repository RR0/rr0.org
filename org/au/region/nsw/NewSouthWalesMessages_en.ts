import { dunmoreNswMessages } from "./dunmore/DunmoreMessages.js"
import { NewSouthWalesCityCode } from "./NewSouthWalesCityCode.js"
import { OrganizationMessages } from "../../../OrganizationMessages.js"
import { OrganizationType } from "../../../Organization.js"

export const newSouthWales_en = new OrganizationMessages("New South Wales")
newSouthWales_en[OrganizationType.city] = {
  [NewSouthWalesCityCode.Dunmore]: dunmoreNswMessages
}
