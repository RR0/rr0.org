import { Country } from "./Country"
import { CountryCode } from "./CountryCode"
import { france } from "../eu/fr/France"
import { finland } from "../eu/fi/Finland"
import { canada } from "../ca/Canada"
import { usa } from "../us/Usa"
import { australia } from "../au/Australia"
import { india } from "../in/Country_in"

/**
 * @deprecated
 */
export class CountryService {
  /**
   * @param countries
   */
  constructor(readonly countries: { [name: string]: Country }) {
  }

  get(code: string): Country | undefined {
    return Object.values(this.countries).find(country => {
      return country.code === code
    })
  }
}

export type CountryList
  = { [key in CountryCode]: Country }

const countries: CountryList = {
  ar: new Country(CountryCode.ar),
  at: new Country(CountryCode.at),
  au: australia,
  be: new Country(CountryCode.be),
  br: new Country(CountryCode.br),
  ca: canada,
  ch: new Country(CountryCode.ch),
  cl: new Country(CountryCode.cl),
  cn: new Country(CountryCode.cn),
  cy: new Country(CountryCode.cy),
  de: new Country(CountryCode.de),
  dk: new Country(CountryCode.dk),
  es: new Country(CountryCode.es),
  fi: finland,
  fr: france,
  gr: new Country(CountryCode.gr),
  hu: new Country(CountryCode.hu),
  ie: new Country(CountryCode.ie),
  il: new Country(CountryCode.il),
  in: india,
  ir: new Country(CountryCode.ir),
  it: new Country(CountryCode.it),
  jp: new Country(CountryCode.jp),
  ma: new Country(CountryCode.ma),
  mx: new Country(CountryCode.mx),
  nl: new Country(CountryCode.nl),
  no: new Country(CountryCode.no),
  nz: new Country(CountryCode.nz),
  pe: new Country(CountryCode.pe),
  pl: new Country(CountryCode.pl),
  pt: new Country(CountryCode.pt),
  ro: new Country(CountryCode.ro),
  ru: new Country(CountryCode.ru),
  sa: new Country(CountryCode.sa),
  se: new Country(CountryCode.se),
  tr: new Country(CountryCode.tr),
  ua: new Country(CountryCode.ua),
  uk: new Country(CountryCode.uk),
  us: usa,
  ve: new Country(CountryCode.ve),
  za: new Country(CountryCode.za)
}

export const countryService = new CountryService(countries)
