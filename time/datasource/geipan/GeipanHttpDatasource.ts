import { RR0SsgContext } from "../../../RR0SsgContext"
import { HttpSource } from "../HttpSource"
import { UrlUtil } from "../../../util/url/UrlUtil"
import { JSDOM } from "jsdom"
import { GeipanCaseSummary, GeipanZoneCode } from "./GeipanCaseSummary"
import { TimeContext } from "../../TimeContext"
import { ObjectUtil } from "../../../util/ObjectUtil"
import assert from "assert"
import {
  GeipanCaseClassification,
  GeipanCaseClassification_calc,
  GeipanCaseClassification_minus
} from "./GeipanCaseClassification"
import { GeipanDatasource } from "./GeipanDatasource"

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

export class GeipanHttpDatasource extends GeipanDatasource {
  protected static readonly dateFormat = /(.+?)\s*\(([\d-AB]+)\)\s+(\d+)(?:.(\d+)(?:.(\d+))?)?/
  protected readonly http = new HttpSource()

  constructor(readonly baseUrl: string, readonly searchPath: string) {
    super()
  }

  protected async readCases(context: RR0SsgContext): Promise<GeipanCaseSummary[]> {
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
    const page = await this.http.fetch<string>(searchUrl + "?" + queryParamsStr,
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
    return Array.from(rowEls).map(row => this.getFromRow(context, row))
  }

  protected getFromRow(context: RR0SsgContext, row: Element): GeipanCaseSummary {
    const linkField = row.querySelector(".fiche-download-icon")
    const caseLink = linkField.firstElementChild as HTMLAnchorElement
    const url = new URL(caseLink.href, this.baseUrl)
    const caseField = row.querySelector(".cas_title")
    const fields = GeipanHttpDatasource.dateFormat.exec(caseField.textContent.trim())
    assert.ok(fields,
      `Case title "${caseField.textContent}" does not match pattern ${GeipanHttpDatasource.dateFormat.source}`)
    const city = fields[1].trim()
    const zoneCode = fields[2] as GeipanZoneCode
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
    const classificationLabel = getLabeledText(".classification")
    const classification = classificationLabel ? classificationLabel.endsWith("-")
      ? ObjectUtil.enumFromValue(GeipanCaseClassification_minus, classificationLabel)
      : ObjectUtil.enumFromValue(GeipanCaseClassification, classificationLabel) : undefined
    return {
      zoneCode,
      caseNumber,
      url,
      city,
      dateTime,
      postTime,
      classification: classification as GeipanCaseClassification_calc
    }
  }

  protected getTime(context: RR0SsgContext, fields: RegExpExecArray, index: number): TimeContext {
    const itemContext = context.clone()
    const dateTime = itemContext.time
    dateTime.setYear(parseInt(fields[index], 10))
    dateTime.setMonth(parseInt(fields[index - 1], 10))
    const dayOfMonth = fields[index - 2]
    dateTime.setDayOfMonth(dayOfMonth !== "00" ? parseInt(dayOfMonth, 10) : undefined)
    return dateTime
  }
}
