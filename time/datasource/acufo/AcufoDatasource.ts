import { RR0SsgContext } from "../../../RR0SsgContext"
import { HttpSource } from "../HttpSource"
import { UrlUtil } from "../../../util/url/UrlUtil"
import { JSDOM } from "jsdom"
import { ObjectUtil } from "../../../util/ObjectUtil"
import assert from "assert"
import { AcufoCase } from "./AcufoCase"
import { CaseSource } from "../CaseSource"
import { NuforcState } from "../nuforc/NuforcState"
import { NuforcCountry } from "../nuforc/NuforcCountry"

import { NuforcShape } from "../nuforc/NuforcShape"

interface QueryParameters {
}

export class AcufoDatasource extends HttpSource implements CaseSource<AcufoCase> {
  readonly authors = ["Gross, Patrick"]
  readonly copyright = "ACUFO/ALSACAT (Les ovnis vus de près)"

  constructor(readonly baseUrl = "https://ufologie.patrickgross.org", readonly searchPath = "alsacat") {
    super()
  }

  async fetch(context: RR0SsgContext): Promise<AcufoCase[]> {
    const day = context.time.getDayOfMonth()
    const month = context.time.getMonth()
    const year = context.time.getYear()
    const searchUrl = UrlUtil.join(this.baseUrl, this.searchPath)
    const lang = context.locale === "fr" ? "f" : ""
    const page = await this.fetch<string>(UrlUtil.join(searchUrl, "_" + year + lang),
      {headers: {accept: "text/html;charset=utf-8"}})
    const doc = new JSDOM(page).window.document.documentElement
    /*const charSetMeta = doc.querySelector("meta[http-equiv='Content-Type']")
    const contentType = charSetMeta.getAttribute("content")
    let charset = findParam(contentType, ";", "charset") as BufferEncoding
    if (charset.startsWith("iso-8859")) {
      charset = "latin1"
    }
    const decoder = new TextDecoder(charset)*/
    const rowEls = doc.querySelectorAll("table")
    return Array.from(rowEls).map(row => this.getNativeCase(context, row))
  }

  protected getNativeCase(context: RR0SsgContext, row: Element): AcufoCase {
    const fields = row.querySelectorAll("td")
    const caseLink = fields[0].firstElementChild as HTMLAnchorElement
    const dateFormat = /(\d\d)\/(\d\d)\/(\d\d\d\d) (\d\d):(\d\d)/
    const dateFields = dateFormat.exec(fields[1].textContent)
    const itemContext = context.clone()
    const dateTime = itemContext.time
    dateTime.setYear(parseInt(dateFields[3], 10))
    dateTime.setMonth(parseInt(dateFields[1], 10))
    const dayOfMonth = dateFields[2]
    dateTime.setDayOfMonth(dayOfMonth !== "00" ? parseInt(dayOfMonth, 10) : undefined)
    const hour = parseInt(dateFields[4], 10)
    const minutes = parseInt(dateFields[5], 10)
    dateTime.setHour(hour)
    dateTime.setMinutes(minutes)
    const url = new URL(caseLink.href, this.baseUrl)
    const caseNumber = HttpSource.findParam(url.href, "?", "id")
    const stateStr = fields[3].textContent
    const state = ObjectUtil.enumFromValue<NuforcState>(NuforcState, stateStr)
    const countryStr = fields[4].textContent
    const country = ObjectUtil.enumFromValue<NuforcCountry>(NuforcCountry, countryStr)
    assert.ok(country, `Unknown NUFORC country "${countryStr}"`)
    const city = fields[2].textContent
    const shape = NuforcShape[fields[5].textContent]
    const summary = fields[6].textContent
    return {
      caseNumber, url, city, state, country, dateTime, shape, summary,
      reportDate: new Date(fields[7].textContent),
      postDate: new Date(fields[8].textContent),
      image: fields[9].textContent === "Y"
    }
  }
}
