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
}
