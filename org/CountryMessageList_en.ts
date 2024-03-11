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
import { polandMessages_en } from "./eu/pl/region/PolandMessages_en"
import { southKoreaMessages_en } from "./kr/SouthKoreaMessages_en"
import { colombiaMessages_en } from "./co/ColombiaMessages_en"
import { dominicanRepublicMessages_en } from "./do/DominicanRepublicMessages_en"
import { philippinesMessages_en } from "./ph/PhilippinesMessages_en"
import { peruMessages_en } from "./pe/region/PeruMessages_en"
import { seychellesMessages_en } from "./sc/SeychellesMessages_en"
import { ukMessages_en } from "./uk/UkMessages_en"

export const countryMessageList_en: CountryMessagesList = {
  at: CountryMessages.create("Austria"),
  ar: CountryMessages.create("Argentina"),
  au: australiaMessages_en,
  be: CountryMessages.create("Belgium"),
  br: brazilMessages_en,
  ca: canadaMessages_en,
  ch: CountryMessages.create("Switzerland"),
  cl: CountryMessages.create("Chile"),
  cn: CountryMessages.create("China"),
  co: colombiaMessages_en,
  cy: CountryMessages.create("Cyprus"),
  de: CountryMessages.create("Germany"),
  dk: CountryMessages.create("Denmark"),
  do: dominicanRepublicMessages_en,
  es: spainMessages_en,
  fi: finlandMessages_en,
  fr: franceMessages_en,
  gr: CountryMessages.create("Greece"),
  hu: CountryMessages.create("Hungary"),
  ie: CountryMessages.create("Ireland"),
  il: CountryMessages.create("Israel"),
  in: CountryMessages.create("India"),
  it: CountryMessages.create("Italia"),
  ir: CountryMessages.create("Iran"),
  jp: CountryMessages.create("Japan"),
  kr: southKoreaMessages_en,
  ma: CountryMessages.create("Morocco"),
  mx: CountryMessages.create("Mexico"),
  nl: CountryMessages.create("Netherlands"),
  no: CountryMessages.create("Norway"),
  nz: newZealandMessages_en,
  pe: peruMessages_en,
  ph: philippinesMessages_en,
  pl: polandMessages_en,
  pt: CountryMessages.create("Portugal"),
  ro: CountryMessages.create("Romania"),
  ru: CountryMessages.create("Russia"),
  sc: seychellesMessages_en,
  tr: CountryMessages.create("Turkey"),
  ua: CountryMessages.create("Ukraine"),
  uk: ukMessages_en,
  us: usaMessages_en,
  sa: CountryMessages.create("Saudi Arabia"),
  se: CountryMessages.create("Sweden"),
  ve: CountryMessages.create("Venezuela"),
  za: CountryMessages.create("South Africa")
}
