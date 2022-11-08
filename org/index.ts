import {SsgContext} from "../tool/SsgContext"
import {Rr0Data} from "../tool/model/Rr0Data"

export interface Organization extends Rr0Data {

  title(context: SsgContext): string
}
