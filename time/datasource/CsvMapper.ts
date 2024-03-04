import { CaseMapper } from "./CaseMapper"
import { RR0SsgContext } from "../../RR0SsgContext"
import { TimeContext } from "../TimeContext"

export class CsvMapper<S> implements CaseMapper<RR0SsgContext, S, string> {
  readonly fields: string[] = []

  constructor(readonly sep = ",", readonly escapeChar = "\"", readonly prefix = "") {
  }

  readonly fieldMapper = (context: RR0SsgContext, key: string, value: any, sourceTime: Date): string => {
    if (value instanceof Date) {
      return value.toISOString()
    } else if (typeof value === "string") {
      return this.escape(value)
    } else if (value instanceof URL || value instanceof TimeContext) {
      return value.toString()
    } else if (Array.isArray(value)) {
      return value.map((item, i) => this.fieldMapper(context, String(i), item, sourceTime)).join(",")
    } else if (typeof value === "object") {
      const subMapper = new CsvMapper(this.sep, this.escapeChar, key + ".")
      return subMapper.map(context, value, sourceTime)
    } else {
      return value
    }
  }

  /**
   * Map a case to a CSV row.
   *
   * @param context
   * @param sourceCase
   * @param sourceTime
   */
  map(context: RR0SsgContext, sourceCase: S, sourceTime: Date): string {
    if (this.fields.length <= 0) {
      this.fields.push(...Object.keys(sourceCase).map(key => this.prefix + key))
    }
    return Object.entries(sourceCase).map(entry => this.fieldMapper(context, entry[0], entry[1], sourceTime)).join(
      this.sep)
  }

  /**
   * Reduce a set of cases to a CSV string.
   *
   * @param context
   * @param sourceCases
   * @param sourceTime
   */
  reduce(context: RR0SsgContext, sourceCases: S[], sourceTime: Date): string {
    const values = sourceCases.map(c => this.map(context, c, sourceTime))
    return this.fields.join(this.sep) + "\n" + values.join("\n")
  }

  escape(value: string): string {
    return value.indexOf(this.sep) >= 0 ? this.escapeChar + value + this.escapeChar : value
  }
}
