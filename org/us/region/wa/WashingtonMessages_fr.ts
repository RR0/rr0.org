import { pierceMessages_fr } from "./pierce/PierceMessages_fr"
import { OrganizationType } from "../../../Organization"
import { OrganizationMessages } from "../../../OrganizationMessages"

export const washingtonMessages_fr = new OrganizationMessages("État de Washington")
washingtonMessages_fr[OrganizationType.department] = {
  pierce: pierceMessages_fr
}
