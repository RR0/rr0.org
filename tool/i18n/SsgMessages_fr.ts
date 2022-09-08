import {MessageUtils, SsgMessages} from "./SsgMessages"

export class SsgMessages_fr implements SsgMessages {
  context = {
    time: {
      duration: {
        days: (d: number): string => MessageUtils.plural(d, "jour"),
        hours: (d: number): string => MessageUtils.plural(d, "heure"),
        minutes: (mn: number): string => MessageUtils.plural(mn, "minute"),
        seconds: (s: number): string => MessageUtils.plural(s, "seconde"),
        lastSeparator: " et ",
        approximate: (txt: string): string => `environ ${txt}`
      },
      relative: {
        year: {
          before: "l'année d'avant",
          after: "l'année suivante"
        },
        month: {
          before: "le mois précédent",
          after: "le mois suivant"
        },
        day: {
          before: "la veille",
          after: "le lendemain"
        },
        hour: {
          before: "une heure auparavant",
          after: "une heure plus tard"
        }
      },
      approximate: (title: string): string => `vers ${title}`,
      fromTo: (startReplacement: string, endReplacement: string): string => `${startReplacement} à ${endReplacement}`
    }
  }
}
