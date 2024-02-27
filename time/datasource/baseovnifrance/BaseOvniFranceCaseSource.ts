import { RR0SsgContext } from "../../../RR0SsgContext"
import { HttpCaseSource } from "../HttpCaseSource"
import { UrlUtil } from "../../../util/url/UrlUtil"
import { JSDOM } from "jsdom"
import { BaseOvniFranceCase } from "./BaseOvniFranceCase"

enum ListType {
  perMonth = 20
}

interface QueryParameters {
  typlist: ListType
  page: number
}

interface FormData {
  mois: string
  an: number
  B1: "Envoyer"
}

export class BaseOvniFranceCaseSource extends HttpCaseSource<BaseOvniFranceCase> {

  constructor(readonly baseUrl = "http://baseovnifrance.free.fr", readonly searchPath = "listgen.php") {
    super("Luc Chastan", "Base OVNI France")
  }

  async getAll(context: RR0SsgContext): Promise<BaseOvniFranceCase[]> {
    const day = context.time.getDayOfMonth()
    const month = context.time.getMonth()
    const year = context.time.getYear()
    const {formData, queryUrl} = this.queryUrl({typlist: ListType.perMonth, page: 0}, month, year)
    const page = await this.submitForm<string>(queryUrl, formData, {accept: "text/html;charset=iso-8859-1"})
    const doc = new JSDOM(page).window.document.documentElement
    /*const charSetMeta = doc.querySelector("meta[http-equiv='Content-Type']")
    const contentType = charSetMeta.getAttribute("content")
    let charset = findParam(contentType, ";", "charset") as BufferEncoding
    if (charset.startsWith("iso-8859")) {
      charset = "latin1"
    }
    const decoder = new TextDecoder(charset)*/
    const rowEls = doc.querySelectorAll("#listgen2 tbody tr")
    const rows = Array.from(rowEls)
    rows.shift()  // Skip header row
    const cases: BaseOvniFranceCase[] = []
    for (const row of rows) {
      cases.push(this.get(context, row))
    }
    return cases
  }

  protected queryUrl(queryParams: QueryParameters, month: number, year: number) {
    const queryParamsStr = UrlUtil.objToQueryParams(queryParams)
    const formData: FormData = {mois: String(month).padStart(2, "0"), an: year, B1: "Envoyer"}
    const searchUrl = UrlUtil.join(this.baseUrl, this.searchPath)
    const queryUrl = UrlUtil.join(searchUrl, "?" + queryParamsStr)
    return {formData, queryUrl}
  }

  protected get(context: RR0SsgContext, row: Element): BaseOvniFranceCase {
    const fields = row.querySelectorAll("td")
    const caseLink = fields[0].firstElementChild as HTMLAnchorElement
    const dateFormat = /(\d\d)-(\d\d)-(\d\d\d\d)/
    const dateFields = dateFormat.exec(fields[1].textContent)
    const itemContext = context.clone()
    const dateTime = itemContext.time
    dateTime.setYear(parseInt(dateFields[3], 10))
    dateTime.setMonth(parseInt(dateFields[2], 10))
    const dayOfMonth = dateFields[1]
    dateTime.setDayOfMonth(dayOfMonth !== "00" ? parseInt(dayOfMonth, 10) : undefined)
    const timeFormat = /(\d\d):(\d\d)/
    const timeFields = timeFormat.exec(fields[2].textContent)
    const hour = timeFields ? parseInt(timeFields[1], 10) : undefined
    const minutes = timeFields ? parseInt(timeFields[2], 10) : undefined
    dateTime.setHour(hour)
    dateTime.setMinutes(minutes)
    dateTime.setTimeZone("GMT+1")
    const result = /(.*?)\s+\((\d+)\)/.exec(caseLink.textContent)
    const place = result[1]
    const depCode = result[2].padStart(2, "0")
    const url = new URL(caseLink.href, this.baseUrl)
    const caseNumber = parseInt(HttpCaseSource.findParam(url.href, "&", "numobs"), 10)
    return {
      caseNumber,
      url,
      place,
      depCode,
      dateTime,
      physicalEffect: fields[3].textContent === "Oui",
      witnessEffect: fields[4].textContent === "Oui",
      entities: fields[5].textContent === "Oui",
      landing: fields[6].textContent === "Oui"
    }
  }
}
