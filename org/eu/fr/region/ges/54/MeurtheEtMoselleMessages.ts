import { MeurtheEtMoselleCityCode } from "./MeurtheEtMoselleCityCode"
import { cosnesEtRomainMessages } from "./cosnesetromain/CosnesEtRomainMessages"
import { nancyMessages } from "./nancy/NancyMessages"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { OrganizationType } from "../../../../../Organization"

export const meurtheEtMoselleMessages = new OrganizationMessages("Meurthe-et-Moselle")
meurtheEtMoselleMessages[OrganizationType.city] = {
  [MeurtheEtMoselleCityCode.CosnesEtRomain]: cosnesEtRomainMessages,
  [MeurtheEtMoselleCityCode.Nancy]: nancyMessages
}
