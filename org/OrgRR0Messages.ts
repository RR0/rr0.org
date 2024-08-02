import { TimeContext } from "../time/TimeContext"

export type OrgRR0Messages = {
  birth: (time: TimeContext) => string
  death: (time: TimeContext) => string
}
