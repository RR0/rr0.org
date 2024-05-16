import { Occupation } from "../people/Occupation"
import { PlaceMessages } from "../place/PlaceMessages"
import { CountryMessagesList } from "../org/CountryMessagesList"
import { Gender } from "@rr0/common"
import { CaseConclusion } from "../science/crypto/ufo/enquete/dossier/RR0Case"

export class MessageUtils {

  static plural(n: number, word: string): string {
    return n ? `${n} ${MessageUtils.pluralWord(n, word)}` : ""
  }

  static pluralWord(n: number, word: string): string {
    return n ? `${word}${n > 1 ? "s" : ""}` : ""
  }
}

type OccupationMessages = { [key in Occupation]: (gender: Gender) => string }

export type CaseConclusionMessages = { [key in CaseConclusion]: string }

export type CaseClassificationMessages = {
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
}
export type CaseMessages = {
  classification: CaseClassificationMessages,
  conclusion: CaseConclusionMessages
}

export interface RR0Messages {
  nonSignificantWords: string[]
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
  case: CaseMessages
  people: {
    occupation: OccupationMessages
  },
  place: PlaceMessages;
  country: CountryMessagesList
  nav: {
    start: string
    contents: string
    prev: string
    next: string
  }
}
