import { pierceMessages_en } from "./pierce/PierceMessages_en"
import { OrganizationMessages } from "../../../OrganizationMessages"
import { OrganizationType } from "../../../Organization"

export const washingtonMessages_en = new OrganizationMessages("Washington state")
washingtonMessages_en[OrganizationType.department] = {
  pierce: pierceMessages_en
}
