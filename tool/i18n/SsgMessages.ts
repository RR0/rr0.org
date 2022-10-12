import {Gender} from "../model/people/Gender"

export class MessageUtils {
  static plural(n: number, word: string): string {
    return n ? n + " " + word + (n > 1 ? "s" : "") : ""
  }
}

export interface SsgMessages {
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
      unknown: string,
      misinterpretation: string
      hoax: string
    }
  }
  people: {
    occupation: {
      anthropologist(gender: Gender): string
      artist(gender: Gender): string
      astronomer(gender: Gender): string
      biologist(gender: Gender): string
      biochemist(gender: Gender): string
      chemist(gender: Gender): string
      cryptozoologist(gender: Gender): string
      dentist(gender: Gender): string
      director(gender: Gender): string
      engineer(gender: Gender): string
      geologist(gender: Gender): string
      historian(gender: Gender): string
      journalist(gender: Gender): string
      lawyer(gender: Gender): string
      librarian(gender: Gender): string
      military(gender: Gender): string
      musician(gender: Gender): string
      neurologist(gender: Gender): string
      parapsychologist(gender: Gender): string
      philosopher(gender: Gender): string
      photographer(gender: Gender): string
      physician(gender: Gender): string
      physicist(gender: Gender): string
      pilot(gender: Gender): string
      producer(gender: Gender): string
      psychologist(gender: Gender): string
      sailor(gender: Gender): string
      sociologist(gender: Gender): string
      softwareEngineer(gender: Gender): string
      stuntman(gender: Gender): string
      teacher(gender: Gender): string
      ufologist(gender: Gender): string
      writer(gender: Gender): string
    }
  },
  country: {
    au: string,
    be: string,
    br: string,
    ca: string,
    ch: string,
    cn: string,
    es: string
    fr: string
    it: string
    mx: string
    nz: string
    pe: string
    ru: string
    uk: string
    us: string
  }
}

