import { VictoriaCityCode } from "./VictoriaCityCode.js"
import { melbourneVicMessages } from "./melbourne/MelbourneMessages.js"
import { OrganizationMessages } from "../../../OrganizationMessages.js"
import { OrganizationType } from "../../../Organization.js"

export const victoria_fr = new OrganizationMessages("Victoria")
victoria_fr[OrganizationType.city] = {
  [VictoriaCityCode.Melbourne]: melbourneVicMessages
}
