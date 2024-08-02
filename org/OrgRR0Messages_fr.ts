import { OrgRR0Messages } from "./OrgRR0Messages"
import { TimeContext } from "../time/TimeContext"

export let orgMessages_fr: OrgRR0Messages = {
  birth: (time: TimeContext) => " est créée " + (time.getDayOfMonth() ? "le" : "en") + " ",
  death: (time: TimeContext) => " cesse " + (time.getDayOfMonth() ? "le" : "en") + " "
}
