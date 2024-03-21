import { OrganizationMessages } from "../../../OrganizationMessages"
import { OrganizationType } from "../../../Organization"
import { AlgerCityCode } from "./AlgerCityCode"
import { alger_fr } from "./Alger/Alger_fr"

export const algerRegion_fr = new OrganizationMessages("Wilaya d'Alger")
algerRegion_fr[OrganizationType.city] = {
  [AlgerCityCode.Alger]: alger_fr
}
