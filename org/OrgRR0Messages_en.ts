import { OrgRR0Messages } from "./OrgRR0Messages"
import { TimeContext } from "../time/TimeContext"

export let orgMessages_en: OrgRR0Messages = {
  birth: (time: TimeContext) => " was created " + (time.getDayOfMonth() ? "the" : "on") + " ",
  death: (time: TimeContext) => " ends " + (time.getDayOfMonth() ? "the" : "on") + " "
}
