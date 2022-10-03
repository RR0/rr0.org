import {MessageUtils, SsgMessages} from "./SsgMessages"

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
}
