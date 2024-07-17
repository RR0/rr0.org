import { RR0SsgContext } from "../../../RR0SsgContext"
import { HttpSource } from "../HttpSource"
import { UrlUtil } from "../../../util/url/UrlUtil"
import { JSDOM } from "jsdom"
import { BaseOvniFranceCaseSummary } from "./BaseOvniFranceCaseSummary"
import { TimeContext } from "../../TimeContext"
import assert from "assert"
import { BaseOvniFranceDatasource } from "./BaseOvniFranceDatasource"

enum ListType {
  perMonth = 20
}

enum Cre {
  export = 1
}

interface QueryParameters {
  typlist: ListType
  cre?: Cre
  an?: number
  mois?: number
  page?: number
}

interface FormData {
  mois: string
  an: number
  B1: "Envoyer"
}

export class BaseOvniFranceHttpDatasource extends BaseOvniFranceDatasource {
  protected static readonly regExp = /(.*?)\s+\(([\dAB]+)\)/
  protected readonly http = new HttpSource()

  constructor(readonly baseUrl: URL = new URL("http://baseovnifrance.free.fr"), readonly searchPath = "listgen.php") {
    super()
  }

  queryUrl(context: RR0SsgContext): { formData: FormData; queryUrl: URL } {
    const time = context.time
    const day = time.getDayOfMonth()
    const month = time.getMonth()
    const year = time.getYear()
    const queryParams: QueryParameters = {typlist: ListType.perMonth, page: 0}
    const queryParamsStr = UrlUtil.objToQueryParams(queryParams)
    const formData: FormData = {mois: String(month).padStart(2, "0"), an: year, B1: "Envoyer"}
    const queryUrl = new URL(this.searchPath, this.baseUrl)
    queryUrl.search = queryParamsStr
    return {formData, queryUrl}
  }

  protected async readCases(context: RR0SsgContext): Promise<BaseOvniFranceCaseSummary[]> {
    const {formData, queryUrl} = this.queryUrl(context)
    const page = await this.http.submitForm<string>(queryUrl, formData, {accept: "text/html;charset=iso-8859-1"})
    const doc = new JSDOM(page).window.document.documentElement
    const rowEls = doc.querySelectorAll("#listgen2 tbody tr")
    const rows = Array.from(rowEls)
    rows.shift()  // Skip header row
    const cases: BaseOvniFranceCaseSummary[] = []
    for (const row of rows) {
      cases.push(this.getFromRow(context, row))
    }
    return cases
  }

  protected getBoolean(field: HTMLTableCellElement): boolean {
    return field.textContent === "Oui"
  }

  protected getDate(context: RR0SsgContext, dateField: HTMLTableCellElement): TimeContext {
    const dateFormat = /(\d\d)-(\d\d)-(\d\d\d\d)/
    const dateFields = dateFormat.exec(dateField.textContent)
    const itemContext = context.clone()
    const dateTime = itemContext.time
    dateTime.setYear(parseInt(dateFields[3], 10))
    dateTime.setMonth(parseInt(dateFields[2], 10))
    const dayOfMonth = dateFields[1]
    dateTime.setDayOfMonth(dayOfMonth !== "00" ? parseInt(dayOfMonth, 10) : undefined)
    return dateTime
  }

  protected setTime(dateTime: TimeContext, timeField: HTMLTableCellElement) {
    const timeFormat = /(\d\d):(\d\d)/
    const timeFields = timeFormat.exec(timeField.textContent)
    const hour = timeFields ? parseInt(timeFields[1], 10) : undefined
    const minutes = timeFields ? parseInt(timeFields[2], 10) : undefined
    dateTime.setHour(hour)
    dateTime.setMinutes(minutes)
    dateTime.setTimeZone("GMT+1")
  }

  protected getFromRow(context: RR0SsgContext, row: Element): BaseOvniFranceCaseSummary {
    const columns = row.querySelectorAll("td")
    const caseLink = columns[0].firstElementChild as HTMLAnchorElement
    const url = new URL(caseLink.href, this.baseUrl)
    const id = new URLSearchParams(url.search).get("numobs")
    const linkParse = BaseOvniFranceHttpDatasource.regExp.exec(caseLink.textContent)
    assert.ok(linkParse,
      `Case title "${caseLink.textContent}" does not match pattern ${BaseOvniFranceHttpDatasource.regExp.source}`)
    const place = linkParse[1]
    const depCode = linkParse[2].padStart(2, "0")
    const dateTime = this.getDate(context, columns[1])
    this.setTime(dateTime, columns[2])
    const physicalEffect = this.getBoolean(columns[3])
    const witnessEffect = this.getBoolean(columns[4])
    const entities = this.getBoolean(columns[5])
    const landing = this.getBoolean(columns[6])
    return {
      id,
      url,
      city: place,
      depCode: depCode,
      dateTime: dateTime,
      physicalEffect,
      witnessEffect,
      entities,
      landing
    }
  }
}
