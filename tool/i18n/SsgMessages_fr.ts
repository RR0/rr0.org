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
      actor: (gender: Gender) => gender === Gender.male ? "acteur" : "actrice",
      anthropologist: (_gender: Gender) => "anthropologue",
      archeologist: (_gender: Gender) => "archéologue",
      artist: (_gender: Gender) => "artiste",
      astronaut: (_gender: Gender) => "astronaute",
      astronomer: (_gender: Gender) => "astronome",
      astrologist: (_gender: Gender) => "astrologue",
      astrophysicist: (gender: Gender) => gender === Gender.male ? "astrophysicien" : "astrophysicienne",
      biologist: (_gender: Gender) => "biologiste",
      biochemist: (_gender: Gender) => "biochimiste",
      biophysicist: (gender: Gender) => gender === Gender.male ? "biophysicien" : "biophysicienne",
      botanist: (_gender: Gender) => "botaniste",
      chemist: (_gender: Gender) => "chimiste",
      contactee: (gender: Gender) => gender === Gender.male ? "contacté" : "contactée",
      cryptozoologist: (_gender: Gender) => "cryptozoologue",
      dentist: (_gender: Gender) => "dentiste",
      director: (_gender: Gender) => "réalisateur",
      engineer: (_gender: Gender) => "ingénieur",
      ethnologist: (_gender: Gender) => "ethnologue",
      exobiologist: (_gender: Gender) => "exobiologiste",
      farmer: (_gender: Gender) => "agriculteur",
      flightAttendant: (gender: Gender) => gender === Gender.male ? "hotesse de l'air" : "stewart",
      geographer: (_gender: Gender) => "géographe",
      geologist: (_gender: Gender) => "géologue",
      geophysicist: (gender: Gender) => gender === Gender.male ? "géophysicien" : "géophysicienne",
      historian: (gender: Gender) => gender === Gender.male ? "historien" : "historienne",
      houseWife: (_gender: Gender) => "femme au foyer",
      journalist: (_gender: Gender) => "journalist",
      lawyer: (gender: Gender) => gender === Gender.male ? "avocat" : "avocate",
      librarian: (_gender: Gender) => "bibliothécaire",
      mathematician: (gender: Gender) => gender === Gender.male ? "mathematicien" : "mathematicienne",
      meteorologist: (_gender: Gender) => "météorologue",
      mechanic: (gender: Gender) => gender === Gender.male ? "mécanicien" : "mécanicienne",
      military: (_gender: Gender) => "militaire",
      musician: (gender: Gender) => gender === Gender.male ? "musicien" : "musicienne",
      neurologist: (_gender: Gender) => "neurologue",
      neuroscientist: (_gender: Gender) => "neuroscientifique",
      neuropsychiatrist: (_gender: Gender) => "neuropsychiatre",
      nurse: (gender: Gender) => gender === Gender.male ? "infirmier" : "infirmière",
      oceanographer: (_gender: Gender) => "océanographe",
      painter: (_gender: Gender) => "peintre",
      parapsychologist: (_gender: Gender) => "parapsychologue",
      philosopher: (_gender: Gender) => "philosophe",
      photographer: (_gender: Gender) => "photographe",
      physicist: (gender: Gender) => gender === Gender.male ? "physicien" : "physicienne",
      physician: (_gender: Gender) => "médecin",
      pilot: (_gender: Gender) => "pilote",
      politician: (gender: Gender) => gender === Gender.male ? "policitien" : "policitienne",
      priest: (gender: Gender) => gender === Gender.male ? "prêtre" : "prêtresse",
      producer: (gender: Gender) => gender === Gender.male ? "producteur" : "productrice",
      psychologist: (_gender: Gender) => "psychologue",
      psychiatrist: (_gender: Gender) => "psychiatre",
      radioastronomer: (_gender: Gender) => "radioastronome",
      sailor: (_gender: Gender) => "marin",
      salesman: (gender: Gender) => gender === Gender.male ? "commercial" : "commerciale",
      sociologist: (_gender: Gender) => "sociologue",
      softwareEngineer: (_gender: Gender) => "Informaticien",
      stuntman: (_gender: Gender) => "cascadeur",
      teacher: (gender: Gender) => gender === Gender.male ? "enseignant" : "enseignante",
      truckDriver: (gender: Gender) => gender === Gender.male ? "camionneur" : "camionneuse",
      taxiDriver: (_gender: Gender) => "taxi",
      telegrapher: (_gender: Gender) => "télégraphiste",
      ufologist: (_gender: Gender) => "ufologue",
      worker: (gender: Gender) => gender === Gender.male ? "ouvrier" : "ouvrière",
      writer: (gender: Gender) => gender === Gender.male ? "écrivain" : "écrivaine"
    }
  }
  country = {
    at: "Autriche",
    au: "Australie",
    be: "Belgique",
    br: "Brésil",
    ca: "Canada",
    ch: "Suisse",
    cn: "Chine",
    de: "Allemagne",
    dk: "Danemark",
    es: "Espagne",
    fi: "Finlande",
    fr: "France",
    gr: "Grèce",
    hu: "Hongrie",
    ie: "Irelande",
    it: "Italie",
    jp: "Japon",
    mx: "Mexique",
    nl: "Pays-Bas",
    no: "Norvège",
    nz: "Nouvelle-Zélande",
    pe: "Pérou",
    pl: "Pologne",
    ro: "Roumanie",
    ru: "Russie",
    tr: "Turquie",
    ua: "Ukraine",
    uk: "Royaume-Uni",
    us: "États-Unis",
    se: "Suède"
  }
  nav = {
    start: "Début",
    contents: "Sommaire",
    prev: "Précédent",
    next: "Suivant"
  }
}
