import { RR0SsgContext } from "../../../RR0SsgContext"
import { HttpCaseSource } from "../HttpCaseSource"
import { UrlUtil } from "../../../util/url/UrlUtil"
import { JSDOM } from "jsdom"
import { GeipanCase, GeipanClassification } from "./GeipanCase"
import { TimeContext } from "../../TimeContext"
import { ObjectUtil } from "../../../util/ObjectUtil"

interface QueryParameters {
  /**
   * "1977/03/31"
   */
  "field_date_d_observation_value[max]": string

  /**
   * "1977/03/01"
   */
  "field_date_d_observation_value[min]": string

  field_document_existe_ou_pas_value: "All"
  field_type_de_cas_target_id: "All"
  "select-category-export": "nothing"
  field_departement_target_id: string
  "field_latitude_value[max]": string
  "field_latitude_value[min]": string
  "field_longitude_value[max]": string
  "field_longitude_value[min]": string
  field_phenomene_target_id: string
  field_agregation_index_value: string
}

export class GeipanDatasource extends HttpCaseSource<GeipanCase> {

  static readonly dateFormat = /(.+?)\s+\((\d+)\)\s+(\d+).(\d+).(\d+)/

  constructor(readonly baseUrl = "https://geipan.fr", readonly searchPath = "fr/recherche/cas") {
    super("GEIPAN", "Catalogue de cas")
  }

  async getAll(context: RR0SsgContext): Promise<GeipanCase[]> {
    const day = context.time.getDayOfMonth()
    const dayStartStr = day ? String(day).padStart(2, "0") : "01"
    const dayEndStr = day ? String(day).padStart(2, "0") : "31"
    const month = context.time.getMonth()
    const year = context.time.getYear()
    const monthStr = String(month).padStart(2, "0")
    const queryParams: QueryParameters = {
      "field_latitude_value[max]": "",
      "field_latitude_value[min]": "",
      "field_longitude_value[max]": "",
      "field_longitude_value[min]": "",
      field_phenomene_target_id: "",
      field_agregation_index_value: "",
      field_departement_target_id: "",
      "field_date_d_observation_value[min]": `${year}/${monthStr}/${dayStartStr}`,
      "field_date_d_observation_value[max]": `${year}/${monthStr}/${dayEndStr}`,
      field_document_existe_ou_pas_value: "All",
      field_type_de_cas_target_id: "All",
      "select-category-export": "nothing"
    }
    const queryParamsStr = UrlUtil.objToQueryParams(queryParams)
    const searchUrl = UrlUtil.join(this.baseUrl, this.searchPath)
    const page = await this.fetch<string>(searchUrl + "?" + queryParamsStr,
      {headers: {accept: "text/html;charset=utf-8"}})
    const doc = new JSDOM(page).window.document.documentElement
    /*const charSetMeta = doc.querySelector("meta[http-equiv='Content-Type']")
    const contentType = charSetMeta.getAttribute("content")
    let charset = findParam(contentType, ";", "charset") as BufferEncoding
    if (charset.startsWith("iso-8859")) {
      charset = "latin1"
    }
    const decoder = new TextDecoder(charset)*/
    const rowEls = doc.querySelectorAll(".views-row")
    return Array.from(rowEls).map(row => this.getNativeCase(context, row))
  }

  protected getNativeCase(context: RR0SsgContext, row: Element): GeipanCase {
    const linkField = row.querySelector(".fiche-download-icon")
    const caseLink = linkField.firstElementChild as HTMLAnchorElement
    const url = new URL(caseLink.href, this.baseUrl)
    const caseField = row.querySelector(".cas_title")
    const fields = GeipanDatasource.dateFormat.exec(caseField.textContent)
    const city = fields[1].trim()
    const depCode = parseInt(fields[2], 10)
    const dateTime = this.getTime(context, fields, 5)
    const caseNumber = url.pathname.substring(url.pathname.lastIndexOf("/") + 1)

    function getLabeledText(clazz: string) {
      const postField = row.querySelector(clazz)
      const nodes = Array.from(postField.childNodes).filter(
        node => node.nodeType == 3 && node.textContent.trim().length > 0)
      return nodes[0].textContent.trim()
    }

    const postDatefields = /(\d+).(\d+).(\d+)/.exec(getLabeledText(".date-update"))
    const postTime = this.getTime(context, postDatefields, 3)
    const classification = ObjectUtil.valueFromKey<GeipanClassification>(GeipanClassification,
      getLabeledText(".classification"))
    return {depCode, caseNumber, url, city, dateTime, postTime, classification}
  }

  private getTime(context: RR0SsgContext, fields: RegExpExecArray, index: number): TimeContext {
    const itemContext = context.clone()
    const dateTime = itemContext.time
    dateTime.setYear(parseInt(fields[index], 10))
    dateTime.setMonth(parseInt(fields[index - 1], 10))
    const dayOfMonth = fields[index - 2]
    dateTime.setDayOfMonth(dayOfMonth !== "00" ? parseInt(dayOfMonth, 10) : undefined)
    return dateTime
  }
}
