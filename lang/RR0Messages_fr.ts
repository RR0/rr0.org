import { CaseConclusionMessages, MessageUtils, RR0Messages } from "./RR0Messages"
import { placeMessages_fr } from "../place/PlaceMessages_fr"
import { peopleMessages_fr } from "../people/PeopleMessages_fr"
import { countryMessageList_fr } from "../org/CountryMessageList_fr"
import { orgMessages_fr } from "../org/OrgRR0Messages_fr"

const caseConclusion_fr: CaseConclusionMessages = {
  unknown: "inexpliqué",
  misinterpretation: "méprise",
  hoax: "canular"
}

export class RR0Messages_fr implements RR0Messages {
  nonSignificantWords = [
    "ce", "du", "va", "se", "peu", "a", "qui", "y", "rend", "nom", "bien", "qu'à", "l'on", "qu'on", "nous", "et",
    "tous", "des", "où", "y'a", "aucun", "cependant", "personnes", "composé", "importe", "peut", "sans", "nécessité",
    "appelle", "étonnant", "retrouve", "observe", "égaux", "existe", "qu", "on", "fait", "rester", "capable",
    "véritable", "celui-ci", "qualifie", "traite", "relate", "toujours", "faire", "n'y", "une", "dont", "les", "p",
    "que", "avec", "n'est", "-", "—", "le", "dans", "très", "de", "après", "un", "étant", "voire", "d'une", "sur",
    "leur", "la", "est", "que", "cela", "ait", "jamais", "il", "pas", "ou", "en", "plus", "moins", "ainsi", "donc",
    "espère", "auparavant", "voulait", "amène", "bonnes", "fameux", "constituant"
  ]
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
      on: (approximate: boolean): string => (approximate ? "vers " : "") + "le ",
      in: (approximate: boolean): string => (approximate ? "vers " : "en "),
      fromTo: (startReplacement: string, endReplacement: string): string => `${startReplacement} à ${endReplacement}`,
      starting: (approximate: boolean): string => "à partir " + (approximate ? "de " : "du ")
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
    conclusion: caseConclusion_fr
  }
  org = orgMessages_fr
  people = peopleMessages_fr
  place = placeMessages_fr
  country = countryMessageList_fr
  nav = {
    start: "Début",
    contents: "Sommaire",
    prev: "Précédent",
    next: "Suivant"
  }
  unit = {
    smi: (miles: number): string => (miles * 1.60934).toFixed(0) + " km",
    fot: (feet: number): string => (feet * 0.3048).toFixed(0) + " m",
    hm: (milesPerHour: number): string => this.unit.smi(milesPerHour) + "/h",
    inh: (inches: number): string => (inches * 2.54).toFixed(0) + " cm"
  }
}
