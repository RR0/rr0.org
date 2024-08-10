import { finland_en } from "./eu/fi/Finland_en"
import { france_en } from "./eu/fr/France_en"
import { usa_en } from "./us/Usa_en"
import { CountryMessagesList } from "./CountryMessagesList"
import { CountryMessages } from "./country/CountryMessages"
import { canada_en } from "./ca/Canada_en"
import { australia_en } from "./au/Australia_en"
import { brazil_en } from "./br/Brazil_en"
import { newZealand_en } from "./nz/NewZealand_en"
import { spain_en } from "./eu/es/region/Spain_en"
import { poland_en } from "./eu/pl/Poland_en"
import { southKorea_en } from "./kr/SouthKorea_en"
import { colombia_en } from "./co/Colombia_en"
import { dominicanRepublic_en } from "./do/DominicanRepublic_en"
import { philippines_en } from "./ph/Philippines_en"
import { peru_en } from "./pe/Peru_en"
import { seychelles_en } from "./sc/Seychelles_en"
import { uk_en } from "./uk/Uk_en"
import { russia_en } from "./ru/Russia_en"
import { denmark_en } from "./eu/dk/Denmark_en"
import { mozambique_en } from "./mz/Mozambique_en"
import { india_en } from "./in/India_en"
import { algeria_en } from "./dz/Algeria_en"
import { panama_en } from "./pa/Panama_en"
import { taiwan_en } from "./tw/Taiwan_en"
import { tunisia_en } from "./tn/Tunisia_en"
import { ecuador_en } from "./ec/Ecuador_en"
import { egypt_en } from "./eg/Egypt_en"
import { georgia_en } from "./ge/Georgia_en"

export const countryMessageList_en: CountryMessagesList = {
  at: CountryMessages.create("Austria"),
  ar: CountryMessages.create("Argentina"),
  au: australia_en,
  be: CountryMessages.create("Belgium"),
  br: brazil_en,
  ca: canada_en,
  ch: CountryMessages.create("Switzerland"),
  cl: CountryMessages.create("Chile"),
  cn: CountryMessages.create("China"),
  co: colombia_en,
  cy: CountryMessages.create("Cyprus"),
  de: CountryMessages.create("Germany"),
  dk: denmark_en,
  dz: algeria_en,
  do: dominicanRepublic_en,
  ec: ecuador_en,
  eg: egypt_en,
  es: spain_en,
  fi: finland_en,
  fr: france_en,
  ga: CountryMessages.create("Gabon"),
  ge: georgia_en,
  gr: CountryMessages.create("Greece"),
  hu: CountryMessages.create("Hungary"),
  ie: CountryMessages.create("Ireland"),
  il: CountryMessages.create("Israel"),
  in: india_en,
  it: CountryMessages.create("Italia"),
  ir: CountryMessages.create("Iran"),
  jp: CountryMessages.create("Japan"),
  kr: southKorea_en,
  ma: CountryMessages.create("Morocco"),
  mx: CountryMessages.create("Mexico"),
  mz: mozambique_en,
  nl: CountryMessages.create("Netherlands"),
  no: CountryMessages.create("Norway"),
  nz: newZealand_en,
  pa: panama_en,
  pe: peru_en,
  ph: philippines_en,
  pl: poland_en,
  pt: CountryMessages.create("Portugal"),
  ro: CountryMessages.create("Romania"),
  ru: russia_en,
  sa: CountryMessages.create("Saudi Arabia"),
  sc: seychelles_en,
  se: CountryMessages.create("Sweden"),
  tn: tunisia_en,
  tr: CountryMessages.create("Turkey"),
  tw: taiwan_en,
  ua: CountryMessages.create("Ukraine"),
  su: CountryMessages.create("USSR"),
  uk: uk_en,
  us: usa_en,
  ve: CountryMessages.create("Venezuela"),
  za: CountryMessages.create("South Africa")
}
