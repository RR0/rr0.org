import { CaseSource } from "../CaseSource"
import { RR0CaseSummary } from "./RR0CaseSummary"
import { HtmlRR0SsgContext, RR0SsgContext } from "../../../RR0SsgContext"

export abstract class RR0Datasource implements CaseSource<RR0CaseSummary> {
  static readonly placeRegex = /^(.+?)(?:\s*\((.+?)(?:\s*,\s*(.+?)(?:\s*,\s*(.+?)))?\))?$/g
  readonly copyright = "RR0"
  readonly authors = ["Beau, Jérôme"]

  abstract fetch(context: RR0SsgContext): Promise<RR0CaseSummary[]>

  abstract getFromRows(context: HtmlRR0SsgContext, rows: Element[]): RR0CaseSummary[]
}
