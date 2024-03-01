import { monroeMessages_fr } from "./monroe/MonroeMessages_fr"
import { OrganizationType } from "../../../Organization"
import { OrganizationMessages } from "../../../OrganizationMessages"

export const indianaMessages_fr = new OrganizationMessages("Indiana")
indianaMessages_fr[OrganizationType.department] = {
  monroe: monroeMessages_fr
}
