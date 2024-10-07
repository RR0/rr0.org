import { Country } from "./Country.js"
import { CountryCode } from "./CountryCode.js"
import { france } from "../eu/fr/France.js"
import { finland } from "../eu/fi/Finland.js"
import { canada } from "../ca/Canada.js"
import { usa } from "../us/Usa.js"
import { australia } from "../au/Australia.js"
import { india } from "../in/India.js"
import { brazil } from "../br/Brazil.js"
import { newZealand } from "../nz/NewZealand.js"
import { philippines } from "../ph/Philippines.js"
import { mexico } from "../mx/Mexico.js"
import { seychelles } from "../sc/Seychelles.js"
import { peru } from "../pe/Peru.js"
import { dominicanRepublic } from "../do/DominicanRepublic.js"
import { southKorea } from "../kr/SouthKorea.js"
import { colombia } from "../co/Colombia.js"
import { uk } from "../uk/Uk.js"
import { OrganizationService } from "../OrganizationService.js"
import { germany } from "../eu/de/Germany.js"
import { russia } from "../ru/Russia.js"
import { mozambique } from "../mz/Mozambique.js"
import { algeria } from "../dz/Algeria.js"
import { panama } from "../pa/Panama.js"
import { taiwan } from "../tw/Taiwan.js"
import { tunisia } from "../tn/Tunisia.js"
import { israel } from "../il/Israel.js"

export class CountryService extends OrganizationService<Country> {
}

const countries: Country[] = [
  algeria,
  new Country(CountryCode.ar),
  new Country(CountryCode.at),
  australia,
  new Country(CountryCode.be),
  brazil,
  canada,
  new Country(CountryCode.ch),
  new Country(CountryCode.cl),
  new Country(CountryCode.cn),
  colombia,
  new Country(CountryCode.cy),
  germany,
  new Country(CountryCode.dk),
  dominicanRepublic,
  new Country(CountryCode.es),
  finland,
  france,
  new Country(CountryCode.gr),
  new Country(CountryCode.hu),
  new Country(CountryCode.ie),
  israel,
  india,
  new Country(CountryCode.ir),
  new Country(CountryCode.it),
  new Country(CountryCode.jp),
  new Country(CountryCode.ma),
  mexico,
  mozambique,
  new Country(CountryCode.nl),
  new Country(CountryCode.no),
  newZealand,
  panama,
  peru,
  philippines,
  new Country(CountryCode.pl),
  new Country(CountryCode.pt),
  new Country(CountryCode.ro),
  russia,
  new Country(CountryCode.sa),
  new Country(CountryCode.se),
  seychelles,
  southKorea,
  new Country(CountryCode.tr),
  taiwan,
  tunisia,
  new Country(CountryCode.ua),
  uk,
  usa,
  new Country(CountryCode.ve),
  new Country(CountryCode.za)
]

export const countryService = new CountryService(countries, "org", undefined)
