import { TimeContext } from "../../TimeContext"
import { GeipanCaseClassification_calc } from "./GeipanCaseClassification"
import { GeipanSightingType } from "./GeipanSightingType"
import { GeipanZoneType } from "./GeipanCase"
import { RR0UfoCase } from "../RR0UfoCase"
import { FranceDepartementCode } from "../../../org/eu/fr/region/FranceDepartementCode"
import { FranceRegionCode } from "../../../org/eu/fr/region/FranceRegionCode"
import { CountryCode } from "../../../org/country/CountryCode"

export type GeipanZoneCode = FranceDepartementCode | FranceRegionCode | CountryCode.fr

/**
 * caseNumber is like "AAAA-MM-number"
 */
export interface GeipanCaseSummary extends RR0UfoCase {
  sightingType?: GeipanSightingType
  city: string
  zoneCode?: GeipanZoneCode
  zoneType?: GeipanZoneType
  postTime: TimeContext
  classification?: GeipanCaseClassification_calc
}
