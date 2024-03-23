import { CaseMapper } from "./CaseMapper"
import { RR0SsgContext } from "../../RR0SsgContext"

export class JsonMapper<S> implements CaseMapper<RR0SsgContext, S, Object> {

  map(context: RR0SsgContext, sourceCase: S, sourceTime: Date): Object {
    return undefined
  }

  /**
   * Converts CSV contents to a list of cases.
   *
   * @param context
   * @param data
   */
  parse(context: RR0SsgContext, data: string): S[] {
    const parsed = JSON.parse(data)
    return parsed as S[]
  }
}
