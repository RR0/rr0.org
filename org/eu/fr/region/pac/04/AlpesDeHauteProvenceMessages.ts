import { AlpesDeHauteProvenceCityCode } from "./AlpesDeHauteProvenceCityCode.js"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages.js"
import { barcelonnetteMessages } from "./Barcelonnette/BarcelonnetteMessages.js"
import { lauzetUbayeMessages } from "./LauzetUbaye/LauzetUbayeMessages.js"
import { entrevauxMessages } from "./Entrevaux/EntrevauxMessages.js"
import { CityMessages } from "../../../../../country/region/department/city/CityMessages.js"

type DepMessages = { [key in AlpesDeHauteProvenceCityCode]: CityMessages }
export const alpesDeHauteProvenceMessages = DepartmentMessages.create<DepMessages>("Alpes-de-Haute-Provence", {
  [AlpesDeHauteProvenceCityCode.Barcelonnette]: barcelonnetteMessages,
  [AlpesDeHauteProvenceCityCode.Entrevaux]: entrevauxMessages,
  [AlpesDeHauteProvenceCityCode.LauzetUbaye]: lauzetUbayeMessages
})
