import { TimeContext } from "../../../../../time/TimeContext"
import { GeipanCaseClassification_calc } from "./GeipanCaseClassification"
import { GeipanSightingType } from "./GeipanSightingType"
import { GeipanZoneType } from "./GeipanCase"
import { FranceDepartementCode } from "../../region/FranceDepartementCode"
import { FranceRegionCode } from "../../region/FranceRegionCode"
import { CountryCode } from "../../../../country/CountryCode"

export type GeipanZoneCode = FranceDepartementCode | FranceRegionCode | CountryCode.fr

/**
 * caseNumber is like "AAAA-MM-number"
 */
export interface GeipanCaseSummary {
  id: string
  url: URL
  dateTime: TimeContext
  sightingType?: GeipanSightingType
  city: string
  zoneCode?: GeipanZoneCode
  zoneType?: GeipanZoneType
  postTime: TimeContext
  classification?: GeipanCaseClassification_calc
}
