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

/**
 * Country messages in French language.
 */
export const countryMessageList_fr: CountryMessagesList = {
  at: new CountryMessages("Autriche"),
  ar: new CountryMessages("Argentine"),
  au: australiaMessages_fr,
  be: new CountryMessages("Belgique"),
  br: brazilMessages_fr,
  ca: canadaMessages_fr,
  ch: new CountryMessages("Suisse"),
  cl: new CountryMessages("Chili"),
  cn: new CountryMessages("Chine"),
  cy: new CountryMessages("Chypre"),
  de: new CountryMessages("Allemagne"),
  dk: new CountryMessages("Danemark"),
  es: spainMessages_fr,
  fi: finlandMessages_fr,
  fr: franceMessages_fr,
  gr: new CountryMessages("Grèce"),
  hu: new CountryMessages("Hongrie"),
  ie: new CountryMessages("Irelande"),
  il: new CountryMessages("Israël"),
  in: new CountryMessages("Inde"),
  it: new CountryMessages("Italie"),
  ir: new CountryMessages("Iran"),
  jp: new CountryMessages("Japon"),
  ma: new CountryMessages("Maroc"),
  mx: new CountryMessages("Mexique"),
  nl: new CountryMessages("Pays-Bas"),
  no: new CountryMessages("Norvège"),
  nz: newZealandMessages_fr,
  pe: new CountryMessages("Pérou"),
  pl: polandMessages_fr,
  pt: new CountryMessages("Portugal"),
  ro: new CountryMessages("Roumanie"),
  ru: new CountryMessages("Russie"),
  tr: new CountryMessages("Turquie"),
  ua: new CountryMessages("Ukraine"),
  uk: new CountryMessages("Royaume-Uni"),
  us: usaMessages_fr,
  sa: new CountryMessages("Arabie Saoudite"),
  se: new CountryMessages("Suède"),
  ve: new CountryMessages("Venezuela"),
  za: new CountryMessages("Afrique du Sud")
}
