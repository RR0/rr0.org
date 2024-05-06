import { TimeContext } from "../../TimeContext"
import { RR0UfoCase } from "../RR0UfoCase"

export interface FuforaCaseSummary extends RR0UfoCase {
  readonly city: string,
  readonly sightingPlace: string | undefined,
  readonly dateTime: TimeContext,
  readonly dateTimeRefinement?: string,
  readonly durationClock?: string;
  readonly durationEstimation?: string;
  readonly classification: string
}
