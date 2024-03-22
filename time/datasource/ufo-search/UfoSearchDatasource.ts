import { CaseSource } from "../CaseSource"
import { NuforcCaseSummary } from "../nuforc/NuforcCaseSummary"
import { RR0SsgContext } from "../../../RR0SsgContext"
import { TimeContext } from "../../TimeContext"

export enum UfoSearchCaseType {
  ufoSightings = "ufo sightings"
}

export type UfoSearchCase = {
  date: TimeContext
  location: string
  desc: string,
  key_vals: {
    url: string
  },
  ref: string,
  search: string,
  source: string,
  source_id: string,
  type: UfoSearchCaseType
}

export abstract class UfoSearchDatasource implements CaseSource<UfoSearchCase> {
  readonly authors = ["Rich Geldreich"]
  readonly copyright = "ufo-search"

  abstract fetch(context: RR0SsgContext): Promise<NuforcCaseSummary[]>
}
