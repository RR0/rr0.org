import { dunmoreNswMessages } from "./dunmore/DunmoreMessages"
import { NewSouthWalesCityCode } from "./NewSouthWalesCityCode"
import { OrganizationMessages } from "../../../OrganizationMessages"
import { OrganizationType } from "../../../Organization"

export const newSouthWales_en = new OrganizationMessages("New South Wales")
newSouthWales_en[OrganizationType.city] = {
  [NewSouthWalesCityCode.Dunmore]: dunmoreNswMessages
}
