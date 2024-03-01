import { melbourneVicMessages } from "./melbourne/MelbourneMessages"
import { VictoriaCityCode } from "./VictoriaCityCode"
import { OrganizationMessages } from "../../../OrganizationMessages"
import { OrganizationType } from "../../../Organization"

export const victoria_en = new OrganizationMessages("Victoria")
victoria_en[OrganizationType.city] = {
  [VictoriaCityCode.Melbourne]: melbourneVicMessages
}
