import { CaseMapper } from "./CaseMapper"
import { RR0SsgContext } from "../../RR0SsgContext"
import { TimeContext } from "../TimeContext"

export class CsvMapper<S> implements CaseMapper<RR0SsgContext, S, string> {

  readonly fields = new Set<string>()

  constructor(
    readonly sep = ",", readonly escapeChar = "\"", readonly prefix = "") {
  }

  readonly fieldMapper = (context: RR0SsgContext, key: string, value: any, sourceTime: Date): string => {
    let addField = true
    let val: any
    if (value instanceof Date) {
      val = value.toISOString()
    } else if (typeof value === "string") {
      val = this.escape(value)
    } else if (value instanceof URL || value instanceof TimeContext) {
      val = value.toString()
    } else if (Array.isArray(value)) {
      val = value.map((item, i) => this.fieldMapper(context, String(i), item, sourceTime)).join(";")
    } else if (typeof value === "object") {
      const subMapper = new CsvMapper(this.sep, this.escapeChar, this.prefix + key + ".")
      const subValues = subMapper.map(context, value, sourceTime)
      let addSubFields = !isFinite(key)
      if (addSubFields) {
        subMapper.fields.forEach(subField => this.fields.add(subField))
      }
      addField = false
      val = subValues
    } else {
      val = value
    }
    if (addField) {
      this.fields.add(this.prefix + key)
    }
    return val
  }

  /**
   * Map a case to a CSV row.
   *
   * @param context
   * @param sourceCase
   * @param sourceTime
   */
  map(context: RR0SsgContext, sourceCase: S, sourceTime: Date): string {
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
    return Array.from(this.fields).join(this.sep) + "\n" + values.join("\n")
  }

  escape(value: string): string {
    return value.indexOf(this.sep) >= 0 ? this.escapeChar + value + this.escapeChar : value
  }

  readLine(line: string): S {
    const c = {}
    const values = line.split(this.sep)
    const fields = Array.from(this.fields)
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      c[field] = values[i]
    }
    return c as S
  }

  read(context: RR0SsgContext, data: string): S[] {
    const lines = data.split("\n")
    const header = lines.shift()
    this.fields.clear()
    const columns = header.split(this.sep)
    columns.forEach(column => this.fields.add(column))
    return lines.filter(l => l.trim()).map(l => this.readLine(l))
  }
}
