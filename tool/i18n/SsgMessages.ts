export interface SsgMessages {
  context: {
    time: {
      relative: {
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
      }
    }
  }
}

class SsgMessages_fr implements SsgMessages {
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
        }
      }
    }
  }
}

class SsgMessages_en implements SsgMessages {
  context = {
    time: {
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
        }
      }
    }
  }
}

export const ssgMessages: { [lang: string]: SsgMessages } = {
  "fr": new SsgMessages_fr(),
  "en": new SsgMessages_en()
}
