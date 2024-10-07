import { GeipanCaseSummary, GeipanZoneCode } from "./GeipanCaseSummary.js"
import assert from "assert"
import {
  GeipanCaseClassification,
  GeipanCaseClassification_calc,
  GeipanCaseClassification_minus
} from "./GeipanCaseClassification"
import { GeipanDatasource } from "./GeipanDatasource.js"
import { HttpSource } from "../../../../../time/datasource/HttpSource.js"
import { HtmlRR0SsgContext, RR0SsgContext } from "../../../../../RR0SsgContext.js"
import { UrlUtil } from "../../../../../util/url/UrlUtil.js"
import { FranceDepartementCode } from "../../region/FranceDepartementCode.js"
import { FranceRegionCode } from "../../region/FranceRegionCode.js"
import { CountryCode } from "../../../../country/CountryCode.js"
import { TimeContext } from "../../../../../time/TimeContext.js"
import { ObjectUtil } from "../../../../../util/ObjectUtil.js"
import { RR0ContextFilter } from "../../../../../time/datasource/rr0/RR0Datasource.js"

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
  "field_latitude_value[max]"?: string
  "field_latitude_value[min]"?: string
  "field_longitude_value[max]"?: string
  "field_longitude_value[min]"?: string
  field_phenomene_target_id: string
  field_agregation_index_value: string
  page?: string
}

/**
 * This datasource will issue queries like
 * https://geipan.fr/fr/recherche/cas?field_agregation_index_value=&field_departement_target_id=&field_type_de_cas_target_id=All&field_phenomene_target_id=&field_date_d_observation_value%5Bmin%5D=2019%2F07%2F01&field_date_d_observation_value%5Bmax%5D=2019%2F12%2F31&field_document_existe_ou_pas_value=All&select-category-export=nothing
 */
export class GeipanHttpDatasource extends GeipanDatasource {

  protected static readonly caseFormat = /(.+?)\s*\(([\d-AB]+)\)\s+(\d+)(?:.(\d+)(?:.(\d+))?)?/
  protected static readonly dateFormat = /(.+?)\s+(\d+)(?:.(\d+)(?:.(\d+))?)?/
  protected readonly http = new HttpSource()

  constructor(readonly baseUrl: URL, readonly searchPath: string) {
    super()
  }

  protected createFilter(context: HtmlRR0SsgContext) {
    // TODO: Use GEIPAN-specific filter
    return new RR0ContextFilter(context)
  }

  protected async readCases(context: RR0SsgContext): Promise<GeipanCaseSummary[]> {
    const time = context.time
    const day = time.getDayOfMonth()
    const dayStartStr = day ? String(day).padStart(2, "0") : "01"
    const dayEndStr = day ? String(day).padStart(2, "0") : "31"
    const month = time.getMonth()
    const monthStartStr = month ? String(month).padStart(2, "0") : "01"
    const monthEndStr = month ? String(month).padStart(2, "0") : "12"
    const yearStart = time.getYear()
    const yearEnd = time.getYear()
    const queryParams: QueryParameters = {
      field_phenomene_target_id: "",
      field_agregation_index_value: "",
      field_departement_target_id: "",
      "field_date_d_observation_value[min]": `${yearStart}/${monthStartStr}/${dayStartStr}`,
      "field_date_d_observation_value[max]": `${yearEnd}/${monthEndStr}/${dayEndStr}`,
      field_document_existe_ou_pas_value: "All",
      field_type_de_cas_target_id: "All",
      "select-category-export": "nothing"
    }
    let nextEl: Element
    let result = []
    const searchUrl = new URL(this.searchPath, this.baseUrl)
    let page = 0
    do {
      queryParams.page = "," + (++page)
      searchUrl.search = UrlUtil.objToQueryParams(queryParams)
      const doc = await this.http.get(searchUrl, {headers: {accept: "text/html;charset=utf-8"}})
      const rowEls = doc.querySelectorAll(".views-row")
      result = result.concat(Array.from(rowEls).map(row => this.getFromRow(context, row)))
      nextEl = doc.querySelector(".pager__item--next")
    } while (nextEl)
    return result
  }

  protected getFromRow(context: RR0SsgContext, row: Element): GeipanCaseSummary {
    const linkField = row.querySelector(".fiche-download-icon")
    const caseLink = linkField.firstElementChild as HTMLAnchorElement
    const url = new URL(caseLink.href, this.baseUrl)
    const caseField = row.querySelector(".cas_title")
    const caseText = caseField.textContent.trim()
    let fields = GeipanHttpDatasource.caseFormat.exec(caseText)
    let city: string
    let zoneCode: FranceDepartementCode | FranceRegionCode | CountryCode.fr
    let dateTime: TimeContext
    if (fields) {
      city = fields[1].trim()
      zoneCode = fields[2] as GeipanZoneCode
      dateTime = this.getTime(context, fields, 5)
    } else {
      fields = GeipanHttpDatasource.dateFormat.exec(caseText)
      city = fields[1].trim()
      assert.ok(fields,
        `Case title "${caseField.textContent}" does not match pattern ${GeipanHttpDatasource.caseFormat.source} nor ${GeipanHttpDatasource.dateFormat.source}`)
      dateTime = this.getTime(context, fields, 4)
    }
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
      id: caseNumber,
      url: url.href,
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
