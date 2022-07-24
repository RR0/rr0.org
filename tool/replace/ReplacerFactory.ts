import {SsgContext} from "../Ssg"
import {SsgReplacer} from "./SsgReplacer"

export interface ReplacerFactory {
  create(context: SsgContext): SsgReplacer
}

