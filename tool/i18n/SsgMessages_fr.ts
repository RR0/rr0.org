import {MessageUtils, SsgMessages} from "./SsgMessages"
import {Gender} from "../model/people/Gender"

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
  case = {
    classification: {
      hynek: {
        NL: {
          short: "LN",
          long: "Lumière Nocturne"
        },
        DD: {
          short: "DD",
          long: "Disque Diurne"
        },
        RV: {
          short: "RV",
          long: "Radar Visuel"
        },
        CE1: {
          short: "RR1",
          long: "Rencontre Rapprochée du 1er type"
        },
        CE2: {
          short: "RR2",
          long: "Rencontre Rapprochée du 2e type"
        },
        CE3: {
          short: "RR3",
          long: "Rencontre Rapprochée du 3e type"
        },
        CE4: {
          short: "RR4",
          long: "Rencontre Rapprochée du 4e type"
        },
        CE5: {
          short: "RR5",
          long: "Rencontre Rapprochée du 5e type"
        }
      }
    },
    conclusion: {
      unknown: "inexpliqué",
      misinterpretation: "méprise",
      hoax: "canular"
    }
  }
  people = {
    occupation: {
      anthropologist: (_gender: Gender) => "anthropologue",
      artist: (_gender: Gender) => "artiste",
      astronomer: (_gender: Gender) => "astronome",
      biologist: (_gender: Gender) => "biologiste",
      biochemist: (_gender: Gender) => "biochimiste",
      chemist: (_gender: Gender) => "chimiste",
      cryptozoologist: (_gender: Gender) => "cryptozoologue",
      dentist: (_gender: Gender) => "dentiste",
      director: (_gender: Gender) => "réalisateur",
      engineer: (_gender: Gender) => "ingénieur",
      geologist: (_gender: Gender) => "géologue",
      historian: (gender: Gender) => gender === Gender.male ? "historien" : "historienne",
      journalist: (_gender: Gender) => "journalist",
      lawyer: (gender: Gender) => gender === Gender.male ? "avocat" : "avocate",
      librarian: (_gender: Gender) => "bibliothécaire",
      neurologist: (_gender: Gender) => "neurologue",
      military: (_gender: Gender) => "militaire",
      musician: (gender: Gender) => gender === Gender.male ? "musicien" : "musicienne",
      parapsychologist: (_gender: Gender) => "parapsychologue",
      philosopher: (_gender: Gender) => "philosophe",
      photographer: (_gender: Gender) => "photographe",
      physicist: (gender: Gender) => gender === Gender.male ? "physicien" : "physicienne",
      physician: (_gender: Gender) => "médecin",
      pilot: (_gender: Gender) => "pilote",
      producer: (gender: Gender) => gender === Gender.male ? "producteur" : "productrice",
      psychologist: (_gender: Gender) => "psychologue",
      sailor: (_gender: Gender) => "marin",
      sociologist: (_gender: Gender) => "sociologue",
      softwareEngineer: (_gender: Gender) => "ingénieur en informatique",
      stuntman: (_gender: Gender) => "cascadeur",
      teacher: (gender: Gender) => gender === Gender.male ? "enseignant" : "enseignante",
      ufologist: (_gender: Gender) => "ufologue",
      writer: (gender: Gender) => gender === Gender.male ? "écrivain" : "écrivaine"
    }
  }
  country = {
    au: "Australie",
    be: "Belgique",
    br: "Brésil",
    ca: "Canada",
    ch: "Suisse",
    cn: "Chine",
    de: "Allemagne",
    fr: "France",
    it: "Italie",
    mx: "Mexique",
    nz: "Nouvelle-Zélande",
    pe: "Pérou",
    ru: "Russie",
    es: "Espagne",
    uk: "Royaume-Uni",
    us: "États-Unis",
    se: "Suède"
  }
}
