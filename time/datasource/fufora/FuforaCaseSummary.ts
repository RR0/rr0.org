import { TimeContext } from "../../TimeContext"
import { UfoCase } from "../UfoCase"

export interface FuforaCaseSummary extends UfoCase {
  readonly city: string,
  readonly sightingPlace: string | undefined,
  readonly dateTime: TimeContext,
  readonly dateTimeRefinement?: string,
  readonly durationClock?: string;
  readonly durationEstimation?: string;
  readonly classification: string
}
