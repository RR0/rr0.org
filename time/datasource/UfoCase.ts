import { TimeContext } from "../TimeContext"
import { Rr0Data } from "../../Rr0Data"

export interface UfoCase extends Rr0Data {
  id: string
  dateTime: TimeContext
  url?: URL
}
