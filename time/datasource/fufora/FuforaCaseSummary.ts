import { TimeContext } from "../../TimeContext"

export type FuforaCaseSummary = {
  readonly caseNumber: number
  readonly url: URL,
  readonly city: string,
  readonly sightingPlace: string | undefined,
  readonly dateTime: TimeContext,
  readonly dateTimeRefinement?: string,
  readonly durationClock?: string;
  readonly durationEstimation?: string;
  readonly classification: string
}
