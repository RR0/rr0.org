import { monroeMessages_en } from "./monroe/MonroeMessages_en"
import { OrganizationMessages } from "../../../OrganizationMessages"
import { OrganizationType } from "../../../Organization"

export const indianaMessages_en = new OrganizationMessages("Indiana")
indianaMessages_en[OrganizationType.department] = {
  monroe: monroeMessages_en
}
