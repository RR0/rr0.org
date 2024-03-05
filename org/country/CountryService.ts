import { Country } from "./Country"
import { CountryCode } from "./CountryCode"
import { france } from "../eu/fr/France"
import { finland } from "../eu/fi/Finland"
import { canada } from "../ca/Canada"
import { usa } from "../us/Usa"
import { australia } from "../au/Australia"
import { india } from "../in/Country_in"
import { brazil } from "../br/Brazil"
import { newZealand } from "../nz/NewZealand"
import { RR0SsgContext } from "../../RR0SsgContext"
import { philippines } from "../ph/Philippines"
import { mexico } from "../mx/Mexico"
import { seychelles } from "../sc/Seychelles"
import { peru } from "../pe/Peru"
import { germany } from "../de/Germany"
import { dominicanRepublic } from "../do/DominicanRepublic"
import { southKorea } from "../kr/SouthKorea"
import { colombia } from "../co/Colombia"
import { uk } from "../uk/Uk"

/**
 * @deprecated
 */
export class CountryService {
  /**
   * @param countries
   */
  constructor(readonly countries: Country[]) {
  }

  get(code: string): Country | undefined {
    return this.countries.find(country => {
      return country.code === code
    })
  }

  findByName(context: RR0SsgContext, name: string): Country | undefined {
    name = name.replaceAll(" ", "-")
    return this.countries.find(country => {
      return country.messages(context).title === name
    })
  }
}

const countries: Country[] = [
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
  new Country(CountryCode.il),
  india,
  new Country(CountryCode.ir),
  new Country(CountryCode.it),
  new Country(CountryCode.jp),
  new Country(CountryCode.ma),
  mexico,
  new Country(CountryCode.nl),
  new Country(CountryCode.no),
  newZealand,
  peru,
  philippines,
  new Country(CountryCode.pl),
  new Country(CountryCode.pt),
  new Country(CountryCode.ro),
  new Country(CountryCode.ru),
  new Country(CountryCode.sa),
  new Country(CountryCode.se),
  seychelles,
  southKorea,
  new Country(CountryCode.tr),
  new Country(CountryCode.ua),
  uk,
  usa,
  new Country(CountryCode.ve),
  new Country(CountryCode.za)
]

export const countryService = new CountryService(countries)
