import { MeurtheEtMoselleCityCode } from "./MeurtheEtMoselleCityCode.js"
import { cosnesEtRomainMessages } from "./CosnesEtRomain/CosnesEtRomainMessages.js"
import { nancyMessages } from "./Nancy/NancyMessages.js"
import { OrganizationMessages } from "../../../../../OrganizationMessages.js"
import { OrganizationType } from "../../../../../Organization.js"
import { neuvesMaisonsMessages } from "./NeuvesMaisons/NeuvesMaisonsMessages.js"

export const meurtheEtMoselleMessages = new OrganizationMessages("Meurthe-et-Moselle")
meurtheEtMoselleMessages[OrganizationType.city] = {
  [MeurtheEtMoselleCityCode.CosnesEtRomain]: cosnesEtRomainMessages,
  [MeurtheEtMoselleCityCode.Nancy]: nancyMessages,
  [MeurtheEtMoselleCityCode.NeuvesMaisons]: neuvesMaisonsMessages
}
