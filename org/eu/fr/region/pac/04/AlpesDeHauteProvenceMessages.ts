import { AlpesDeHauteProvenceCityCode } from "./AlpesDeHauteProvenceCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { barcelonnetteMessages } from "./Barcelonnette/BarcelonnetteMessages"
import { lauzetUbayeMessages } from "./LauzetUbaye/LauzetUbayeMessages"
import { entrevauxMessages } from "./Entrevaux/EntrevauxMessages"

type DepMessages<T> = { [key in AlpesDeHauteProvenceCityCode]: T }
export const alpesDeHauteProvenceMessages = DepartmentMessages.create<DepMessages>("Alpes-de-Haute-Provence", {
  [AlpesDeHauteProvenceCityCode.Barcelonnette]: barcelonnetteMessages,
  [AlpesDeHauteProvenceCityCode.Entrevaux]: entrevauxMessages,
  [AlpesDeHauteProvenceCityCode.LauzetUbaye]: lauzetUbayeMessages
})
