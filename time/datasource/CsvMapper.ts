import { CaseMapper } from "./CaseMapper"
import { RR0SsgContext } from "../../RR0SsgContext"
import { TimeContext } from "../TimeContext"

export class CsvMapper<S> implements CaseMapper<RR0SsgContext, S, string> {

  readonly fields = new Set<string>()

  constructor(
    readonly sep = ",", readonly escapeStr = "\"", readonly prefix = "") {
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
      const subMapper = new CsvMapper(this.sep, this.escapeStr, this.prefix + key + ".")
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
    return this.escapeStr && value.indexOf(this.sep) >= 0 ? this.escapeStr + value + this.escapeStr : value
  }

  read(context: RR0SsgContext, data: string): S[] {
    let eol = data.indexOf("\n")
    const header = data.substring(0, eol)
    data = data.substring(eol + 1).replaceAll(`""`, "''")
    this.fields.clear()
    const columns = header.split(this.sep)
    columns.forEach(column => this.fields.add(column))
    const records: S[] = []
    let regex = new RegExp(`(?:${this.escapeStr}(.*?)${this.escapeStr}(?:${this.sep}|\n))|(?:(.*?)(?:${this.sep}|\n))`,
      "gs")
    let values = []
    let m
    const fields = Array.from(this.fields)
    while ((m = regex.exec(data)) !== null) {
      if (m.index === regex.lastIndex) {  // This is necessary to avoid infinite loops with zero-width matches
        regex.lastIndex++
        if (regex.lastIndex > data.length) {
          break
        }
      }
      m.forEach((match, group) => {
        let empty = match === this.sep && group
        if (match !== undefined && group) {
          const val = empty ? "" : match
          values.push(val)
          const c = {}
          if (values.length === fields.length) {
            for (let i = 0; i < fields.length; i++) {
              const field = fields[i]
              c[field] = values[i]
            }
            records.push(c as S)
            values = []
            data = data.substring(regex.lastIndex)
            regex = new RegExp(`(?:${this.escapeStr}(.*?)${this.escapeStr}(?:${this.sep}|\n))|(?:(.*?)(?:${this.sep}|\n))`,
              "gs")
          }
        }
      })
    }
    return records
  }
}
