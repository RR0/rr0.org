import { MeurtheEtMoselleCityCode } from "./MeurtheEtMoselleCityCode"
import { cosnesEtRomainMessages } from "./CosnesEtRomain/CosnesEtRomainMessages"
import { nancyMessages } from "./Nancy/NancyMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { OrganizationType } from "../../../../../Organization"
import { neuvesMaisonsMessages } from "./NeuvesMaisons/NeuvesMaisonsMessages"

export const meurtheEtMoselleMessages = new OrganizationMessages("Meurthe-et-Moselle")
meurtheEtMoselleMessages[OrganizationType.city] = {
  [MeurtheEtMoselleCityCode.CosnesEtRomain]: cosnesEtRomainMessages,
  [MeurtheEtMoselleCityCode.Nancy]: nancyMessages,
  [MeurtheEtMoselleCityCode.NeuvesMaisons]: neuvesMaisonsMessages
}
