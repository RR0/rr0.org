import { CountryMessagesList } from "./CountryMessagesList.js"
import { france_fr } from "./eu/fr/France_fr.js"
import { usa_fr } from "./us/Usa_fr.js"
import { finland_fr } from "./eu/fi/Finland_fr.js"
import { CountryMessages } from "./country/CountryMessages.js"
import { canada_fr } from "./ca/Canada_fr.js"
import { australia_fr } from "./au/Australia_fr.js"
import { brazil_fr } from "./br/Brazil_fr.js"
import { newZealand_fr } from "./nz/NewZealand_fr.js"
import { spain_fr } from "./eu/es/region/Spain_fr.js"
import { poland_fr } from "./eu/pl/Poland_fr.js"
import { southKorea_fr } from "./kr/SouthKorea_fr.js"
import { colombia_fr } from "./co/Colombia_fr.js"
import { dominicanRepublic_fr } from "./do/DominicanRepublic_fr.js"
import { peru_fr } from "./pe/Peru_fr.js"
import { philippines_fr } from "./ph/Philippines_fr.js"
import { seychelles_fr } from "./sc/Seychelles_fr.js"
import { uk_fr } from "./uk/Uk_fr.js"
import { russia_fr } from "./ru/Russia_fr.js"
import { denmark_fr } from "./eu/dk/Denmark_fr.js"
import { mozambique_fr } from "./mz/Mozambique_fr.js"
import { india_fr } from "./in/India_fr.js"
import { algeria_fr } from "./dz/Algeria_fr.js"
import { panama_fr } from "./pa/Panama_fr.js"
import { taiwan_fr } from "./tw/Taiwan_fr.js"
import { tunisia_fr } from "./tn/Tunisia_fr.js"
import { ecuador_fr } from "./ec/Ecuador_fr.js"
import { egypt_fr } from "./eg/Egypt_fr.js"
import { georgia_fr } from "./ge/Georgia_fr.js"

/**
 * Country messages in French language.
 */
export const countryMessageList_fr: CountryMessagesList = {
  at: CountryMessages.create("Autriche"),
  ar: CountryMessages.create("Argentine"),
  au: australia_fr,
  be: CountryMessages.create("Belgique"),
  br: brazil_fr,
  ca: canada_fr,
  ch: CountryMessages.create("Suisse"),
  cl: CountryMessages.create("Chili"),
  cn: CountryMessages.create("Chine"),
  co: colombia_fr,
  cy: CountryMessages.create("Chypre"),
  de: CountryMessages.create("Allemagne"),
  dk: denmark_fr,
  do: dominicanRepublic_fr,
  dz: algeria_fr,
  ec: ecuador_fr,
  eg: egypt_fr,
  es: spain_fr,
  fi: finland_fr,
  fr: france_fr,
  ga: CountryMessages.create("Gabon"),
  ge: georgia_fr,
  gr: CountryMessages.create("Grèce"),
  hu: CountryMessages.create("Hongrie"),
  ie: CountryMessages.create("Irelande"),
  il: CountryMessages.create("Israël"),
  in: india_fr,
  it: CountryMessages.create("Italie"),
  ir: CountryMessages.create("Iran"),
  jp: CountryMessages.create("Japon"),
  kr: southKorea_fr,
  ma: CountryMessages.create("Maroc"),
  mx: CountryMessages.create("Mexique"),
  mz: mozambique_fr,
  nl: CountryMessages.create("Pays-Bas"),
  no: CountryMessages.create("Norvège"),
  nz: newZealand_fr,
  pa: panama_fr,
  pe: peru_fr,
  ph: philippines_fr,
  pl: poland_fr,
  pt: CountryMessages.create("Portugal"),
  ro: CountryMessages.create("Roumanie"),
  ru: russia_fr,
  sa: CountryMessages.create("Arabie Saoudite"),
  sc: seychelles_fr,
  se: CountryMessages.create("Suède"),
  tn: tunisia_fr,
  tr: CountryMessages.create("Turquie"),
  tw: taiwan_fr,
  su: CountryMessages.create("URSS"),
  ua: CountryMessages.create("Ukraine"),
  uk: uk_fr,
  us: usa_fr,
  ve: CountryMessages.create("Venezuela"),
  za: CountryMessages.create("Afrique du Sud")
}
