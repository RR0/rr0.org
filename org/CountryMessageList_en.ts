import { finlandMessages_en } from "./eu/fi/FinlandMessages_en"
import { franceMessages_en } from "./eu/fr/FranceMessages_en"
import { usaMessages_en } from "./us/UsaMessages_en"
import { CountryMessagesList } from "./CountryMessagesList"
import { CountryMessages } from "./country/CountryMessages"
import { canadaMessages_en } from "./ca/CanadaMessages_en"

export const countryMessageList_en: CountryMessagesList = {
  at: new CountryMessages("Austria"),
  ar: new CountryMessages("Argentina"),
  au: new CountryMessages("Australia"),
  be: new CountryMessages("Belgium"),
  br: new CountryMessages("Brasil"),
  ca: canadaMessages_en,
  ch: new CountryMessages("Switzerland"),
  cl: new CountryMessages("Chile"),
  cn: new CountryMessages("China"),
  cy: new CountryMessages("Cyprus"),
  de: new CountryMessages("Germany"),
  dk: new CountryMessages("Denmark"),
  es: new CountryMessages("Spain"),
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
  nz: new CountryMessages("New Zealand"),
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
