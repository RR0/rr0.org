import { melbourneVicMessages } from "./melbourne/MelbourneMessages.js"
import { VictoriaCityCode } from "./VictoriaCityCode.js"
import { OrganizationMessages } from "../../../OrganizationMessages.js"
import { OrganizationType } from "../../../Organization.js"

export const victoria_en = new OrganizationMessages("Victoria")
victoria_en[OrganizationType.city] = {
  [VictoriaCityCode.Melbourne]: melbourneVicMessages
}
