import { OccupationMessages } from "./OccupationMessages"
import { TimeContext } from "../time/TimeContext"

export type PeopleMessages = {
  occupation: OccupationMessages
  birth: (time: TimeContext) => string
  death: (time: TimeContext) => string
}
