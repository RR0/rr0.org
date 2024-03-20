import { AlpesDeHauteProvenceCityCode } from "./AlpesDeHauteProvenceCityCode"
import { OrganizationMessages } from "../../../../../OrganizationMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { barcelonnetteMessages } from "./Barcelonnette/BarcelonnetteMessages"
import { lauzetUbayeMessages } from "./LauzetUbaye/LauzetUbayeMessages"

type HautesAlpesCityList<T> = { [key in AlpesDeHauteProvenceCityCode]: T }
const alpesDeHauteProvenceCityMessages: HautesAlpesCityList<OrganizationMessages> = {
  [AlpesDeHauteProvenceCityCode.Barcelonnette]: barcelonnetteMessages,
  [AlpesDeHauteProvenceCityCode.LauzetUbaye]: lauzetUbayeMessages
}
export const alpesDeHauteProvenceMessages = DepartmentMessages.create("Alpes-de-Haute-Provence",
  alpesDeHauteProvenceCityMessages)
