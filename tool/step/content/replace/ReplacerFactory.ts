import {SsgReplacer} from "./SsgReplacer"
import {SsgContext} from "../../../SsgContext"

export interface ReplacerFactory {
  create(context: SsgContext): Promise<SsgReplacer>
}

