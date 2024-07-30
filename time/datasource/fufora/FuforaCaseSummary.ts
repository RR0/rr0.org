import { TimeContext } from "../../TimeContext"

export interface FuforaCaseSummary {
  readonly city: string,
  readonly sightingPlace: string | undefined,
  readonly dateTime: TimeContext,
  readonly dateTimeRefinement?: string,
  readonly durationClock?: string;
  readonly durationEstimation?: string;
  readonly classification: string
}
