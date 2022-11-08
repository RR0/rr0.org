import {Rr0Data} from "../Rr0Data"
import {SsgContext} from "ssg-api"

export interface Organization extends Rr0Data {

  title(context: SsgContext): string
}
