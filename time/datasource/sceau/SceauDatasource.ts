import { SceauCaseSummary } from "./SceauCaseSummary"
import { AbstractDatasource } from "../AbstractDatasource"
import { HtmlRR0SsgContext, RR0SsgContext } from "../../../RR0SsgContext"
import { ContextFilter } from "../ContextFilter"
import { TimeContext } from "../../TimeContext"

export type CaseMapping = { [key in keyof SceauCaseSummary]: string }

export type FondMapping = {
  path: string
  mapping: CaseMapping
}

export class SceauContextFilter extends ContextFilter<SceauCaseSummary> {

  constructor(context: RR0SsgContext) {
    super(context)
  }

  filter(c: SceauCaseSummary): boolean {
    const dateStr = c.dateCas || c.datePubli || c.dateEnquete
    const isoCaseDate = dateStr.toUpperCase()
    const sightingTime = TimeContext.fromString(isoCaseDate)
    const time = this.context.time
    const day = time.getDayOfMonth()
    const month = time.getMonth()
    const year = time.getYear()
    return (!year || year === sightingTime.getYear()) && (!month || month === sightingTime.getMonth()) && (!day || day === sightingTime.getDayOfMonth())
  }
}

export abstract class SceauDatasource extends AbstractDatasource<SceauCaseSummary> {

  protected constructor(
    readonly pages: FondMapping[] = [
      {
        path: "fond_patrick_fournel/base_fond_patrick_fournel.html",
        mapping: {
          datePubli: "DATE PUBLI",
          dateCas: "DATE CAS",
          pays: "PAYS",
          ville: "VILLE",
          journal: "JOURNAL",
          journalSource: "JOURNAL/SOURCE",
          titreSource: "TITRE/SOURCE",
          resume: "RESUME",
          pdf: "PDF",
          texte: "TEXTE",
          json: "JSON",
          nomFichier: "NOM FICHIER"
        }
      },
      {
        path: "fond_gueudelot/base_fiches_gueudelot.html",
        mapping: {
          id: "#",
          dateCas: "DATE",
          pays: "PAYS",
          ville: "VILLE",
          journalSource: "JOURNAL/SOURCE",
          titreSource: "TITRE/SOURCE",
          resume: "RESUME",
          numero: "NUMERO",
          pdf: "PDF",
          texte: "TEXTE",
          json: "JSON",
          nomFichier: "NOM FICHIER"
        }
      },
      {
        path: "fond_ldln/base_ldln_contre_enquetes.html",
        mapping: {
          id: "NUMERO CAS",
          dateCas: "DATE",
          dateEnquete: "DATE_ENQUETE",
          enqueteur: "ENQUETEUR",
          resume: "RESUME",
          conclusion: "CONCLUSION",
          pdf: "PDF",
          texte: "TEXTE",
          json: "JSON",
          nomFichier: "NOM FICHIER"
        }
      },
      {
        path: "fond_psy/base_fond_psy_presse_france.html",
        mapping: {
          id: "NUMERO CAS",
          datePubli: "DATE_PARUTION",
          dateCas: "DATE",
          pays: "PAYS",
          ville: "VILLE",
          journal: "JOURNAL",
          page: "PAGE",
          titreSource: "TITRE",
          resume: "RESUME",
          pdf: "PDF",
          texte: "TEXTE",
          json: "JSON",
          nomFichier: "NOM FICHIER"
        }
      },
      {
        path: "fond_rre/base_fond_rre_CdP1_2.html",
        mapping: {
          datePubli: "DATE PUBLI",
          dateCas: "DATE CAS",
          pays: "PAYS",
          ville: "VILLE",
          journal: "JOURNAL",
          journalSource: "JOURNAL/SOURCE",
          titreSource: "TITRE/SOURCE",
          resume: "RESUME",
          pdf: "PDF",
          texte: "TEXTE",
          json: "JSON",
          nomFichier: "NOM FICHIER"
        }
      },
      {
        path: "fond_rre/base_fond_rre_CdP1_2_3.html",
        mapping: {
          datePubli: "DATE PUBLI",
          dateCas: "DATE CAS",
          pays: "PAYS",
          ville: "VILLE",
          journal: "JOURNAL",
          journalSource: "JOURNAL/SOURCE",
          titreSource: "TITRE/SOURCE",
          resume: "RESUME",
          pdf: "PDF",
          texte: "TEXTE",
          json: "JSON",
          nomFichier: "NOM FICHIER"
        }
      },
      {
        path: "fond_rre/base_fond_rre_CdP1_2_3_4.html",
        mapping: {
          datePubli: "DATE PUBLI",
          dateCas: "DATE CAS",
          pays: "PAYS",
          ville: "VILLE",
          journal: "JOURNAL",
          journalSource: "JOURNAL/SOURCE",
          titreSource: "TITRE/SOURCE",
          resume: "RESUME",
          pdf: "PDF",
          texte: "TEXTE",
          json: "JSON",
          nomFichier: "NOM FICHIER"
        }
      }
    ],
    authors = ["SCEAU"],
    copyright = "Fonds"
  ) {
    super(authors, copyright)
  }

  protected createFilter(context: HtmlRR0SsgContext) {
    return new SceauContextFilter(context)
  }

  protected abstract readCases(context: RR0SsgContext): Promise<SceauCaseSummary[]>
}
