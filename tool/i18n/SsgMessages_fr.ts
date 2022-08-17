import {SsgMessages} from "./SsgMessages"

export class SsgMessages_fr implements SsgMessages {
  context = {
    time: {
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
      fromTo: (startReplacement: string, endReplacement: string): string => startReplacement + " à " + endReplacement
    }
  }
}
