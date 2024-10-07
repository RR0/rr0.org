import { OrganizationMessages } from "../../../OrganizationMessages.js"
import { OrganizationType } from "../../../Organization.js"
import { AlgerCityCode } from "./AlgerCityCode.js"
import { alger_en } from "./Alger/Alger_en.js"

export const algerRegion_en = new OrganizationMessages("Algiers Province")
algerRegion_en[OrganizationType.city] = {
  [AlgerCityCode.Alger]: alger_en
}
