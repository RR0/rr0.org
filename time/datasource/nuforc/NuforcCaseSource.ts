import { RR0SsgContext } from "../../../RR0SsgContext"
import { HttpCaseSource } from "../HttpCaseSource"
import { UrlUtil } from "../../../util/url/UrlUtil"
import { JSDOM } from "jsdom"
import { NuforcCase, NuforcCountry, NuforcShape, NuforcState } from "./NuforcCase"
import assert from "assert"

interface QueryParameters {
  id: string
}

export class NuforcCaseSource extends HttpCaseSource<NuforcCase> {

  constructor(readonly baseUrl = "https://nuforc.org", readonly searchPath = "subndx") {
    super("NUFORC", "Online Database")
  }

  async getAll(context: RR0SsgContext): Promise<NuforcCase[]> {
    const day = context.time.getDayOfMonth()
    const month = context.time.getMonth()
    const year = context.time.getYear()
    const queryParams: QueryParameters = {
      id: "e" + year + String(month).padStart(2, "0")
    }
    const queryParamsStr = UrlUtil.objToQueryParams(queryParams)
    const searchUrl = UrlUtil.join(this.baseUrl, this.searchPath)
    const page = await this.fetch<string>(UrlUtil.join(searchUrl, "?" + queryParamsStr),
      {headers: {accept: "text/html;charset=utf-8"}})
    const doc = new JSDOM(page).window.document.documentElement
    /*const charSetMeta = doc.querySelector("meta[http-equiv='Content-Type']")
    const contentType = charSetMeta.getAttribute("content")
    let charset = findParam(contentType, ";", "charset") as BufferEncoding
    if (charset.startsWith("iso-8859")) {
      charset = "latin1"
    }
    const decoder = new TextDecoder(charset)*/
    const rowEls = doc.querySelectorAll("#table_1 tbody tr")
    return Array.from(rowEls).map(row => this.getNativeCase(context, row))
  }

  protected getNativeCase(context: RR0SsgContext, row: Element): NuforcCase {
    const dateFormat = /(\d\d)\/(\d\d)\/(\d\d\d\d) (\d\d):(\d\d)/
    const fields = row.querySelectorAll("td")
    const caseLink = fields[0].firstElementChild as HTMLAnchorElement
    const dateFields = dateFormat.exec(fields[1].textContent)
    const itemContext = context.clone()
    const itemTime = itemContext.time
    itemTime.setYear(parseInt(dateFields[3], 10))
    itemTime.setMonth(parseInt(dateFields[1], 10))
    const dayOfMonth = dateFields[2]
    itemTime.setDayOfMonth(dayOfMonth !== "00" ? parseInt(dayOfMonth, 10) : undefined)
    const hour = parseInt(dateFields[4], 10)
    const minutes = parseInt(dateFields[5], 10)
    itemTime.setHour(hour)
    itemTime.setMinutes(minutes)
    const url = new URL(caseLink.href, this.baseUrl)
    const caseNumber = parseInt(HttpCaseSource.findParam(url.href, "?", "id"), 10)
    const stateStr = fields[3].textContent
    const stateEntry = Object.entries(NuforcState).find(entry => entry[1] == stateStr)
    assert.ok(stateEntry, `Could not find NuforcState with value "${stateStr}"`)
    return {
      caseNumber,
      url,
      city: fields[2].textContent,
      state: NuforcState[stateEntry[0]],
      country: NuforcCountry[fields[4].textContent],
      dateTime: itemTime,
      shape: NuforcShape[fields[5].textContent],
      summary: fields[6].textContent,
      reportDate: new Date(fields[7].textContent),
      postDate: new Date(fields[8].textContent),
      image: fields[9].textContent === "Y"
    }
  }
}
