import { TimeContext } from "../../TimeContext"
import { GeipanCaseClassification_calc } from "./GeipanCaseClassification"
import { GeipanSightingType } from "./GeipanSightingType"
import { CountryCode } from "/org/country/CountryCode"
import { FranceRegionCode } from "/org/eu/fr/region/FranceRegionCode"
import { FranceDepartementCode } from "/org/eu/fr/region/FranceDepartementCode"
import { GeipanZoneType } from "./GeipanCase"
import { UfoCase } from "../UfoCase"

export type GeipanZoneCode = FranceDepartementCode | FranceRegionCode | CountryCode.fr

/**
 * caseNumber is like "AAAA-MM-number"
 */
export interface GeipanCaseSummary extends UfoCase {
  sightingType?: GeipanSightingType
  city: string
  zoneCode?: GeipanZoneCode
  zoneType?: GeipanZoneType
  postTime: TimeContext
  classification?: GeipanCaseClassification_calc
}
