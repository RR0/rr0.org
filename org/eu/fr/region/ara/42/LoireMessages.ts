import { stEtienne42Messages } from "./stetienne/StEtienneMessages"
import { LoireCityCode } from "./LoireCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { OrganizationType } from "../../../../../Organization"

export const loireMessages = new OrganizationMessages("Loire")
loireMessages[OrganizationType.city] = {
  [LoireCityCode.StEtienne]: stEtienne42Messages
}
