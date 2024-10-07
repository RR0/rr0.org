import { OrganizationMessages } from "../../../OrganizationMessages.js"
import { OrganizationType } from "../../../Organization.js"
import { AlgerCityCode } from "./AlgerCityCode.js"
import { alger_fr } from "./Alger/Alger_fr.js"

export const algerRegion_fr = new OrganizationMessages("Wilaya d'Alger")
algerRegion_fr[OrganizationType.city] = {
  [AlgerCityCode.Alger]: alger_fr
}
