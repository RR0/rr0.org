import { finlandMessages_en } from "./eu/fi/FinlandMessages_en"
import { franceMessages_en } from "./eu/fr/FranceMessages_en"
import { usaMessages_en } from "./us/UsaMessages_en"
import { CountryMessagesList } from "./CountryMessagesList"
import { CountryMessages } from "./country/CountryMessages"
import { canadaMessages_en } from "./ca/CanadaMessages_en"
import { australiaMessages_en } from "./au/AustraliaMessages_en"
import { brazilMessages_en } from "./br/BrazilMessages_en"
import { newZealandMessages_en } from "./nz/NewZealandMessages_en"
import { spainMessages_en } from "./eu/es/region/SpainMessages_en"

export const countryMessageList_en: CountryMessagesList = {
  at: new CountryMessages("Austria"),
  ar: new CountryMessages("Argentina"),
  au: australiaMessages_en,
  be: new CountryMessages("Belgium"),
  br: brazilMessages_en,
  ca: canadaMessages_en,
  ch: new CountryMessages("Switzerland"),
  cl: new CountryMessages("Chile"),
  cn: new CountryMessages("China"),
  cy: new CountryMessages("Cyprus"),
  de: new CountryMessages("Germany"),
  dk: new CountryMessages("Denmark"),
  es: spainMessages_en,
  fi: finlandMessages_en,
  fr: franceMessages_en,
  gr: new CountryMessages("Greece"),
  hu: new CountryMessages("Hungary"),
  ie: new CountryMessages("Ireland"),
  il: new CountryMessages("Israel"),
  in: new CountryMessages("India"),
  it: new CountryMessages("Italia"),
  ir: new CountryMessages("Iran"),
  jp: new CountryMessages("Japan"),
  ma: new CountryMessages("Morocco"),
  mx: new CountryMessages("Mexico"),
  nl: new CountryMessages("Netherlands"),
  no: new CountryMessages("Norway"),
  nz: newZealandMessages_en,
  pe: new CountryMessages("Peru"),
  pl: new CountryMessages("Poland"),
  pt: new CountryMessages("Portugal"),
  ro: new CountryMessages("Romania"),
  ru: new CountryMessages("Russia"),
  tr: new CountryMessages("Turkey"),
  ua: new CountryMessages("Ukraine"),
  uk: new CountryMessages("United Kingdom"),
  us: usaMessages_en,
  sa: new CountryMessages("Saudi Arabia"),
  se: new CountryMessages("Sweden"),
  ve: new CountryMessages("Venezuela"),
  za: new CountryMessages("South Africa")
}
