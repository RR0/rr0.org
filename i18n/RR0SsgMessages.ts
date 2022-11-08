import {Gender} from "../people/Gender"
import {CountryCode} from "../org/CountryCode"
import {Occupation} from "../people/Occupation"
import {FrCountryMessages} from "../org/eu/fr/FrCountry"
import {CountryMessages} from "../org/Country"
import {UsCountryMessages} from "../org/us/UsCountry"

export class MessageUtils {
  static plural(n: number, word: string): string {
    return n ? `${n} ${word}${n > 1 ? "s" : ""}` : ""
  }
}

type CountriesMessages
  = { [key in CountryCode]: CountryMessages }
  & { us: UsCountryMessages }
  & { fr: FrCountryMessages }

type OccupationMessages = { [key in Occupation]: (gender: Gender) => string }

export interface RR0SsgMessages {
  context: {
    time: {
      duration: {
        days: (d: number) => string
        hours: (h: number) => string
        minutes: (mn: number) => string
        seconds: (mn: number) => string
        lastSeparator: string
        approximate(txt: string): string
      },
      relative: {
        hour: {
          before: string
          after: string
        },
        year: {
          before: string
          after: string
        },
        month: {
          before: string
          after: string
        },
        day: {
          before: string
          after: string
        }
      },
      fromTo(startReplacement: string, endReplacement: string): string
      approximate(title: string): string
    }
  }
  case: {
    classification: {
      hynek: {
        NL: {
          short: string
          long: string
        }
        DD: {
          short: string
          long: string
        }
        RV: {
          short: string
          long: string
        }
        CE1: {
          short: string
          long: string
        }
        CE2: {
          short: string
          long: string
        }
        CE3: {
          short: string
          long: string
        }
        CE4: {
          short: string
          long: string
        }
        CE5: {
          short: string
          long: string
        }
      }
    },
    conclusion: {
      unknown: string
      misinterpretation: string
      hoax: string
    }
  }
  people: {
    occupation: OccupationMessages
  },
  country: CountriesMessages
  nav: {
    start: string
    contents: string
    prev: string
    next: string
  }
}

