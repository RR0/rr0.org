import { RR0CaseSummary } from "./RR0CaseSummary"
import { AbstractDatasource } from "../AbstractDatasource"

export abstract class RR0Datasource extends AbstractDatasource<RR0CaseSummary> {
  static readonly placeRegex = /^(.+?)(?:\s*\((.+?)(?:\s*,\s*(.+?)(?:\s*,\s*(.+?)))?\))?$/g

  protected constructor() {
    super(["Beau, Jérôme"], "RR0")
  }
}
