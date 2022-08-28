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
    }
  }
}

