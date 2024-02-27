import { TimeContext } from "../../TimeContext"

export type FuforaCase = {
  readonly caseNumber: number
  readonly url: URL,
  readonly sightingPlace: string | undefined,
  readonly city: string,
  readonly dateTime: TimeContext,
  readonly timeDetails: string,
  readonly classification: string
}
