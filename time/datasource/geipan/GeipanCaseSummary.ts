import { TimeContext } from "../../TimeContext"
import { GeipanCaseClassification_calc } from "./GeipanCaseClassification"
import { GeipanSightingType } from "./GeipanSightingType"
import { CountryCode } from "../../../org/country/CountryCode"
import { FranceRegionCode } from "../../../org/eu/fr/region/FranceRegionCode"
import { FranceDepartementCode } from "../../../org/eu/fr/region/FranceDepartementCode"
import { GeipanZoneType } from "./GeipanCase"

export type GeipanZoneCode = FranceDepartementCode | FranceRegionCode | CountryCode.fr

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

  zoneCode?: GeipanZoneCode
  zoneType?: GeipanZoneType

  postTime: TimeContext

  classification?: GeipanCaseClassification_calc
}
