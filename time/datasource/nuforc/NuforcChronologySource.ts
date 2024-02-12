import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { HttpChrolologySource } from "../HttpChrolologySource"
import { UrlUtil } from "../../../util/url/UrlUtil"
import { JSDOM } from "jsdom"
import { TimeContext } from "../../TimeContext"

enum Shape {
  Circle = "Circle",
  Disk = "Disk",
  Light = "Light",
  Cylinder = "Cylinder"
}

const translations: { [key in Shape]: string } = {
  [Shape.Circle]: "d'un cercle",
  [Shape.Disk]: "d'un disque",
  [Shape.Light]: "d'une lumière",
  [Shape.Cylinder]: "d'un cylindre"
}

interface QueryParameters {
  id: string
}

class NuforcCase {
  constructor(
    readonly url: string,
    readonly place: string,
    readonly dateTime: TimeContext,
    readonly shape: Shape,
    readonly summary: string,
    readonly reportDate: Date,
    readonly postDate: Date,
    readonly image: boolean
  ) {
  }

  get caseNumber() {
    return HttpChrolologySource.findParam(this.url, "?", "id")
  }
}

export class NuforcChronologySource extends HttpChrolologySource {
  constructor(protected baseUrl = "https://nuforc.org", protected searchPath = "subndx") {
    super("NUFORC", "Online Database")
  }

  async get(context: HtmlRR0SsgContext): Promise<HTMLLIElement[]> {
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
    const rows = Array.from(rowEls)
    const dateFormat = /(\d\d)\/(\d\d)\/(\d\d\d\d) (\d\d):(\d\d)/
    const cases: NuforcCase[] = []
    for (const row of rows) {
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
      const c = new NuforcCase(
        caseLink.href,
        `${fields[2].textContent} (${fields[3].textContent}, ${fields[4].textContent})`,
        itemTime,
        Shape[fields[5].textContent],
        fields[6].textContent,
        new Date(fields[7].textContent),
        new Date(fields[8].textContent),
        fields[9].textContent === "Y"
      )
      cases.push(c)
    }
    const outDoc = context.outputFile.document
    return cases.map(c => {
      const item = outDoc.createElement("li")
      const timeEl = outDoc.createElement("time")
      timeEl.textContent = c.dateTime.toString()
      item.append(timeEl)
      item.append(" À ")
      const placeEl = outDoc.createElement("span")
      placeEl.className = "place"
      placeEl.textContent = c.place
      item.append(placeEl)
      const description = [", observation"]
      description.push(translations[c.shape])
      item.append(description.join(", "))
      const sourceEl = this.thisSourceElement(context, c)
      item.append(" ", sourceEl)
      return item
    })
  }

  protected thisSourceElement(context: HtmlRR0SsgContext, c: NuforcCase) {
    const sourceEl = this.sourceElement(context)
    const caseUrl = UrlUtil.join(this.baseUrl, c.url)
    const caseLink = context.outputFile.document.createElement("a")
    caseLink.href = caseUrl
    caseLink.textContent = ", cas n° " + c.caseNumber
    sourceEl.append(caseLink)
    return sourceEl
  }
}
