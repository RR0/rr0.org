import { TimeContext } from "../time/TimeContext"
import { RR0Data } from "../RR0Data"

export type Publication = {
  publisher: string
  time: TimeContext | undefined
}

export interface Source extends RR0Data {
  readonly previousSourceRefs?: string[]
  readonly id?: string
  readonly title?: string
  readonly authors?: string[]
  readonly publication?: Publication
  readonly subTitle?: string
  readonly series?: string
  readonly summary?: string,
  readonly dirName?: string
}
