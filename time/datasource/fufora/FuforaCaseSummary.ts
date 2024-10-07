import { TimeContext } from "../../TimeContext.js"

export interface FuforaCaseSummary {
  readonly id: string
  readonly url: string
  readonly city: string
  readonly sightingPlace: string | undefined
  readonly dateTime: TimeContext
  readonly dateTimeRefinement?: string
  readonly durationClock?: string
  readonly durationEstimation?: string
  readonly classification: string
}
