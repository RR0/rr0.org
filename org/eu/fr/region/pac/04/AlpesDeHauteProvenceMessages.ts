import { AlpesDeHauteProvenceCityCode } from "./AlpesDeHauteProvenceCityCode"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"
import { barcelonnetteMessages } from "./Barcelonnette/BarcelonnetteMessages"
import { lauzetUbayeMessages } from "./LauzetUbaye/LauzetUbayeMessages"
import { entrevauxMessages } from "./Entrevaux/EntrevauxMessages"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages"

type DepMessages = { [key in AlpesDeHauteProvenceCityCode]: CityMessages }
export const alpesDeHauteProvenceMessages = DepartmentMessages.create<DepMessages>("Alpes-de-Haute-Provence", {
  [AlpesDeHauteProvenceCityCode.Barcelonnette]: barcelonnetteMessages,
  [AlpesDeHauteProvenceCityCode.Entrevaux]: entrevauxMessages,
  [AlpesDeHauteProvenceCityCode.LauzetUbaye]: lauzetUbayeMessages
})
