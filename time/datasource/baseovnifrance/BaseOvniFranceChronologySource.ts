import { HtmlRR0SsgContext } from "../../../RR0SsgContext"
import { HttpChrolologySource } from "../HttpChrolologySource"
import { UrlUtil } from "../../../util/url/UrlUtil"
import { JSDOM } from "jsdom"
import { TimeContext } from "../../TimeContext"

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

class BaseOvniFranceCase {
  constructor(
    readonly url: string,
    readonly place: string,
    readonly dateTime: TimeContext,
    readonly physicalEffect: boolean,
    readonly witnessEffect: boolean,
    readonly entities: boolean,
    readonly landing: boolean
  ) {
  }

  get caseNumber() {
    return HttpChrolologySource.findParam(this.url, "&", "numobs")
  }
}

export class BaseOvniFranceChronologySource extends HttpChrolologySource {
  constructor(protected baseUrl = "http://baseovnifrance.free.fr", protected searchPath = "listgen.php") {
    super("Luc Chastan", "Base OVNI France")
  }

  async get(context: HtmlRR0SsgContext): Promise<HTMLLIElement[]> {
    const day = context.time.getDayOfMonth()
    const month = context.time.getMonth()
    const year = context.time.getYear()
    const queryParams: QueryParameters = {
      typlist: ListType.perMonth,
      page: 0
    }
    const queryParamsStr = UrlUtil.objToQueryParams(queryParams)
    const formData: FormData = {
      mois: String(month).padStart(2, "0"),
      an: year,
      B1: "Envoyer"
    }
    const searchUrl = UrlUtil.join(this.baseUrl, this.searchPath)
    const page = await this.submitForm<string>(UrlUtil.join(searchUrl, "?" + queryParamsStr), formData,
      {accept: "text/html;charset=iso-8859-1"})
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
    const dateFormat = /(\d\d)-(\d\d)-(\d\d\d\d)/
    const timeFormat = /(\d\d):(\d\d)/
    const cases: BaseOvniFranceCase[] = []
    for (const row of rows) {
      const fields = row.querySelectorAll("td")
      const caseLink = fields[0].firstElementChild as HTMLAnchorElement
      const dateFields = dateFormat.exec(fields[1].textContent)
      const itemContext = context.clone()
      const itemTime = itemContext.time
      itemTime.setYear(parseInt(dateFields[3], 10))
      itemTime.setMonth(parseInt(dateFields[2], 10))
      const dayOfMonth = dateFields[1]
      itemTime.setDayOfMonth(dayOfMonth !== "00" ? parseInt(dayOfMonth, 10) : undefined)
      const timeFields = timeFormat.exec(fields[2].textContent)
      let hour, minutes
      if (timeFields) {
        hour = parseInt(timeFields[1], 10)
        minutes = parseInt(timeFields[2], 10)
      } else {
        hour = undefined
        minutes = undefined
      }
      itemTime.setHour(hour)
      itemTime.setMinutes(minutes)
      const c = new BaseOvniFranceCase(
        caseLink.href,
        caseLink.textContent,
        itemTime,
        fields[3].textContent === "Oui",
        fields[4].textContent === "Oui",
        fields[5].textContent === "Oui",
        fields[6].textContent === "Oui"
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
      if (c.landing) {
        description.push("avec atterrissage")
      }
      if (c.entities) {
        description.push("avec entités")
      }
      if (c.physicalEffect) {
        description.push("avec effet physique")
      }
      if (c.witnessEffect) {
        description.push("avec effet sur témoin")
      }
      item.append(description.join(", "))
      const sourceEl = this.thisSourceElement(context, c)
      item.append(" ", sourceEl)
      return item
    })
  }

  protected thisSourceElement(context: HtmlRR0SsgContext, c: BaseOvniFranceCase) {
    const sourceEl = this.sourceElement(context)
    const caseUrl = UrlUtil.join(this.baseUrl, c.url)
    const caseLink = context.outputFile.document.createElement("a")
    caseLink.href = caseUrl
    caseLink.textContent = ", cas n° " + c.caseNumber
    sourceEl.append(caseLink)
    return sourceEl
  }
}
