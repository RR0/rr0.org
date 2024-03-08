import { TimeContext } from "../../TimeContext"
import { GeipanCaseClassification_calc } from "./GeipanCaseClassification"
import { GeipanSightingType } from "./GeipanSightingType"
import { CountryCode } from "../../../org/country/CountryCode"
import { FranceRegionCode } from "../../../org/eu/fr/region/FranceRegionCode"
import { FranceDepartementCode } from "../../../org/eu/fr/region/FranceDepartementCode"

export type GeipanCaseSummary = {
  /**
   * "AAAA-MM-number"
   */
  caseNumber: string

  url: URL

  sightingType?: GeipanSightingType

  /**
   * Sighting date.
   */
  dateTime: TimeContext

  city: string

  depCode?: FranceDepartementCode
  regionCode?: FranceRegionCode
  countryCode?: CountryCode.fr

  postTime: TimeContext

  classification?: GeipanCaseClassification_calc
}
