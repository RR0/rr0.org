import { CountryMessagesList } from "./CountryMessagesList"
import { franceMessages_fr } from "./eu/fr/FranceMessages_fr"
import { usaMessages_fr } from "./us/UsaMessages_fr"
import { finlandMessages_fr } from "./eu/fi/FinlandMessages_fr"
import { CountryMessages } from "./country/CountryMessages"
import { canadaMessages_fr } from "./ca/CanadaMessages_fr"
import { australiaMessages_fr } from "./au/AustraliaMessages_fr"
import { brazilMessages_fr } from "./br/BrazilMessages_fr"
import { newZealandMessages_fr } from "./nz/NewZealandMessages_fr"
import { spainMessages_fr } from "./eu/es/region/SpainMessages_fr"
import { polandMessages_fr } from "./eu/pl/region/PolandMessages_fr"
import { southKoreaMessages_fr } from "./kr/SouthKoreaMessages_fr"
import { colombiaMessages_fr } from "./co/ColombiaMessages_fr"
import { dominicanRepublicMessages_fr } from "./do/DominicanRepublicMessages_fr"
import { peruMessages_fr } from "./pe/region/PeruMessages_fr"
import { philippinesMessages_fr } from "./ph/PhilippinesMessages_fr"
import { seychellesMessages_fr } from "./sc/SeychellesMessages_fr"
import { ukMessages_fr } from "./uk/UkMessages_fr"

/**
 * Country messages in French language.
 */
export const countryMessageList_fr: CountryMessagesList = {
  at: CountryMessages.create("Autriche"),
  ar: CountryMessages.create("Argentine"),
  au: australiaMessages_fr,
  be: CountryMessages.create("Belgique"),
  br: brazilMessages_fr,
  ca: canadaMessages_fr,
  ch: CountryMessages.create("Suisse"),
  cl: CountryMessages.create("Chili"),
  cn: CountryMessages.create("Chine"),
  co: colombiaMessages_fr,
  cy: CountryMessages.create("Chypre"),
  de: CountryMessages.create("Allemagne"),
  dk: CountryMessages.create("Danemark"),
  do: dominicanRepublicMessages_fr,
  es: spainMessages_fr,
  fi: finlandMessages_fr,
  fr: franceMessages_fr,
  gr: CountryMessages.create("Grèce"),
  hu: CountryMessages.create("Hongrie"),
  ie: CountryMessages.create("Irelande"),
  il: CountryMessages.create("Israël"),
  in: CountryMessages.create("Inde"),
  it: CountryMessages.create("Italie"),
  ir: CountryMessages.create("Iran"),
  jp: CountryMessages.create("Japon"),
  kr: southKoreaMessages_fr,
  ma: CountryMessages.create("Maroc"),
  mx: CountryMessages.create("Mexique"),
  nl: CountryMessages.create("Pays-Bas"),
  no: CountryMessages.create("Norvège"),
  nz: newZealandMessages_fr,
  pe: peruMessages_fr,
  ph: philippinesMessages_fr,
  pl: polandMessages_fr,
  pt: CountryMessages.create("Portugal"),
  ro: CountryMessages.create("Roumanie"),
  ru: CountryMessages.create("Russie"),
  sc: seychellesMessages_fr,
  tr: CountryMessages.create("Turquie"),
  ua: CountryMessages.create("Ukraine"),
  uk: ukMessages_fr,
  us: usaMessages_fr,
  sa: CountryMessages.create("Arabie Saoudite"),
  se: CountryMessages.create("Suède"),
  ve: CountryMessages.create("Venezuela"),
  za: CountryMessages.create("Afrique du Sud")
}
