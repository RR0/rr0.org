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
      val = this.escape(value.map((item, i) => this.fieldMapper(context, String(i), item, sourceTime)).join(this.sep),
        true)
    } else if (typeof value === "object") {
      const subMapper = new CsvMapper(this.sep, this.escapeStr, this.prefix + key + ".")
      const subValues = subMapper.map(context, value, sourceTime)
      let addSubFields = !isFinite(key as any)
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
    const entries = Array.from(Object.entries(sourceCase)).sort((entry1, entry2) => entry1[0].localeCompare(entry2[0]))
    return entries.map(entry => this.fieldMapper(context, entry[0], entry[1], sourceTime)).join(
      this.sep)
  }

  /**
   * Reduce a set of cases to a CSV string.
   *
   * @param context
   * @param sourceCases
   * @param sourceTime
   */
  mapAll(context: RR0SsgContext, sourceCases: S[], sourceTime: Date): string {
    const values = sourceCases.map(c => this.map(context, c, sourceTime))
    return Array.from(this.fields).join(this.sep) + "\n" + values.join("\n")
  }

  escape(value: string, force?: boolean): string {
    if (this.escapeStr && (force || value.indexOf(this.sep) >= 0)) {
      value = value.replaceAll(this.escapeStr, this.escapeStr + this.escapeStr)
      return this.escapeStr + value + this.escapeStr
    } else {
      return value
    }
  }

  /**
   * Converts CSV contents to a list of cases.
   *
   * @param data
   * @param headers The headers info to fill, to keep CSV columns order.
   */
  parse(data: string, headers: string[] = []): S[] {
    let eol = data.indexOf("\n")
    const header = data.substring(0, eol)
    data = data.substring(eol + 1).replaceAll(`""`, "''")
    this.fields.clear()
    const columns = header.split(this.sep)
    headers.push(...columns)
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
            // data = data.substring(regex.lastIndex)
            //regex.lastIndex = 0
          }
        }
      })
    }
    return records
  }
}
