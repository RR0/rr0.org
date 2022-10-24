import {MessageUtils, SsgMessages} from "./SsgMessages"
import {Gender} from "../model/people/Gender"

export class SsgMessages_en implements SsgMessages {
  context = {
    time: {
      duration: {
        days: (d: number): string => MessageUtils.plural(d, "day"),
        hours: (d: number): string => MessageUtils.plural(d, "hour"),
        minutes: (mn: number): string => MessageUtils.plural(mn, "minute"),
        seconds: (s: number): string => MessageUtils.plural(s, "second"),
        lastSeparator: " and ",
        approximate: (txt: string): string => `${txt} approximately`
      },
      relative: {
        year: {
          before: "the year before",
          after: "the year after"
        },
        month: {
          before: "le month before",
          after: "the month after"
        },
        day: {
          before: "the day before",
          after: "the day after"
        },
        hour: {
          before: "one hour before",
          after: "one hour later"
        }
      },
      approximate: (title: string): string => `around ${title}`,
      fromTo: (startReplacement: string, endReplacement: string): string => startReplacement + " to " + endReplacement
    }
  }
  case = {
    classification: {
      hynek: {
        NL: {
          short: "NL",
          long: "Noctunal Light"
        },
        DD: {
          short: "DD",
          long: "Daylight Disc"
        },
        RV: {
          short: "RV",
          long: "Radar Visual"
        },
        CE1: {
          short: "CE1",
          long: "Close Encounter of the 1st kind"
        },
        CE2: {
          short: "CE2",
          long: "Close Encounter of the 2d kind"
        },
        CE3: {
          short: "CE3",
          long: "Close Encounter of the 3rd kind"
        },
        CE4: {
          short: "CE4",
          long: "Close Encounter of the 4th kind"
        },
        CE5: {
          short: "CE5",
          long: "Close Encounter of the 5th kind"
        }
      }
    },
    conclusion: {
      unknown: "unexplained",
      misinterpretation: "misinterpretation",
      hoax: "hoax"
    }
  }
  people = {
    occupation: {
      anthropologist: (_gender: Gender) => "anthropologist",
      archeologist: (_gender: Gender) => "archeologist",
      artist: (_gender: Gender) => "artist",
      astronaut: (_gender: Gender) => "astronaut",
      astrologist: (_gender: Gender) => "astrologist",
      astronomer: (_gender: Gender) => "astronomer",
      astrophysicist: (_gender: Gender) => "astrophysicist",
      biologist: (_gender: Gender) => "biologist",
      biochemist: (_gender: Gender) => "biochemist",
      biophysicist: (_gender: Gender) => "biophysicist",
      botanist: (_gender: Gender) => "botanist",
      chemist: (_gender: Gender) => "chemist",
      cryptozoologist: (_gender: Gender) => "cryptozoologist",
      dentist: (_gender: Gender) => "dentist",
      director: (_gender: Gender) => "director",
      engineer: (_gender: Gender) => "engineer",
      ethnologist: (_gender: Gender) => "ethnologist",
      exobiologist: (_gender: Gender) => "exobiologist",
      geographer: (_gender: Gender) => "geographer",
      geologist: (_gender: Gender) => "geologist",
      geophysicist: (_gender: Gender) => "geophysicist",
      historian: (_gender: Gender) => "historian",
      journalist: (_gender: Gender) => "journalist",
      librarian: (_gender: Gender) => "librarian",
      lawyer: (_gender: Gender) => "lawyer",
      mathematician: (_gender: Gender) => "mathematician",
      meteorologist: (_gender: Gender) => "meteorologist",
      military: (_gender: Gender) => "military",
      musician: (_gender: Gender) => "musician",
      neurologist: (_gender: Gender) => "neurologist",
      neuroscientist: (_gender: Gender) => "neuroscientist",
      neuropsychiatrist: (_gender: Gender) => "neuropsychiatrist",
      oceanographer: (_gender: Gender) => "oceanographer",
      painter: (_gender: Gender) => "painter",
      philosopher: (_gender: Gender) => "philosopher",
      photographer: (_gender: Gender) => "photographer",
      parapsychologist: (_gender: Gender) => "parapsychologist",
      physicist: (_gender: Gender) => "physicist",
      physician: (_gender: Gender) => "physician",
      pilot: (_gender: Gender) => "pilot",
      politician: (_gender: Gender) => "politician",
      producer: (_gender: Gender) => "producer",
      psychologist: (_gender: Gender) => "psychologist",
      psychiatrist: (_gender: Gender) => "psychiatrist",
      radioastronomer: (_gender: Gender) => "radioastronomer",
      sailor: (_gender: Gender) => "sailor",
      sociologist: (_gender: Gender) => "sociologist",
      softwareEngineer: (_gender: Gender) => "software engineer",
      stuntman: (_gender: Gender) => "stuntman",
      teacher: (_gender: Gender) => "teacher",
      ufologist: (_gender: Gender) => "ufologist",
      writer: (_gender: Gender) => "writer"
    }
  }
  country = {
    at: "Austria",
    au: "Australia",
    be: "Belgium",
    br: "Brasil",
    ca: "Canada",
    ch: "Switzerland",
    cn: "China",
    de: "Germany",
    dk: "Danemark",
    es: "Spain",
    fr: "France",
    gr: "Greece",
    hu: "Hungary",
    ie: "Ireland",
    it: "Italia",
    mx: "Mexico",
    nl: "Netherlands",
    no: "Norway",
    nz: "New Zealand",
    pe: "Peru",
    pl: "Poland",
    ro: "Romania",
    ru: "Russia",
    tr: "Turkey",
    ua: "Ukraine",
    uk: "United Kingdom",
    us: "USA",
    se: "Sweden"
  }
  nav = {
    start: "Start",
    contents: "Contents",
    prev: "Previous",
    next: "Next"
  }
}
