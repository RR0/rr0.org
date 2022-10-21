import {SsgContext} from "../../../SsgContext"

export interface ReplacerFactory<R> {
  create(context: SsgContext): Promise<R>
}

