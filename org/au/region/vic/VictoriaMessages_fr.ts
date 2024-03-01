import { VictoriaCityCode } from "./VictoriaCityCode"
import { melbourneVicMessages } from "./melbourne/MelbourneMessages"
import { OrganizationMessages } from "../../../OrganizationMessages"
import { OrganizationType } from "../../../Organization"

export const victoria_fr = new OrganizationMessages("Victoria")
victoria_fr[OrganizationType.city] = {
  [VictoriaCityCode.Melbourne]: melbourneVicMessages
}
