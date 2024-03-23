import { RR0SsgContext } from "../../../RR0SsgContext"
import { TimeContext } from "../../TimeContext"
import { AbstractCaseSource } from "../AbstractCaseSource"

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

export abstract class UfoSearchDatasource extends AbstractCaseSource<UfoSearchCase> {
  readonly authors = ["Rich Geldreich"]
  readonly copyright = "ufo-search"

  protected abstract readSummaries(context: RR0SsgContext): Promise<UfoSearchCase[]>
}
