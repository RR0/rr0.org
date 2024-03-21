import { OrganizationMessages } from "../../../OrganizationMessages"
import { OrganizationType } from "../../../Organization"
import { AlgerCityCode } from "./AlgerCityCode"
import { alger_en } from "./Alger/Alger_en"

export const algerRegion_en = new OrganizationMessages("Algiers Province")
algerRegion_en[OrganizationType.city] = {
  [AlgerCityCode.Alger]: alger_en
}
