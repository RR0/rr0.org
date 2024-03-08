import { MeuseCityCode } from "./MeuseCityCode"
import { vaucouleursMessages } from "./vaucouleurs/VaucouleursMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { OrganizationType } from "../../../../../Organization"

export const meuseMessages = new OrganizationMessages("Meurthe-et-Moselle")
meuseMessages[OrganizationType.city] = {
  [MeuseCityCode.Vaucouleurs]: vaucouleursMessages
}
