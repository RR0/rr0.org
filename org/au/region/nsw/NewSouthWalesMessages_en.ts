import { dunmoreNswMessages } from "./dunmore/DunmoreMessages"
import { NewSouthWalesCode } from "./NewSouthWalesCode"
import { OrganizationMessages } from "../../../OrganizationMessages"
import { OrganizationType } from "../../../Organization"

export const newSouthWales_en = new OrganizationMessages("New South Wales")
newSouthWales_en[OrganizationType.city] = {
  [NewSouthWalesCode.Dunmore]: dunmoreNswMessages
}
