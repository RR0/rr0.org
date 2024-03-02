import { FranceRegionCode } from "../../eu/fr/region/FranceRegionCode"
import { RegionCode_in } from "../../in/RegionCode_in"
import { Place } from "../../../place/Place"
import { FinlandRegionCode } from "../../eu/fi/region/FinlandRegionCode"
import { UsaRegionCode } from "../../us/region/UsaRegionCode"
import { CanadaRegionCode } from "../../ca/region/CanadaRegionCode"
import { AustraliaRegionCode } from "../../au/region/AustraliaRegionCode"
import { BrazilRegionCode } from "../../br/region/BrazilRegionCode"
import { Organization, OrganizationType } from "../../Organization"

export type RegionCode_eu = FranceRegionCode | FinlandRegionCode

export type RegionCode =
  RegionCode_eu
  | UsaRegionCode
  | CanadaRegionCode
  | RegionCode_in
  | AustraliaRegionCode
  | BrazilRegionCode

export class Region extends Organization {

  constructor(code: RegionCode, country: Organization, places: Place[]) {
    super(code, places, OrganizationType.region, country)
  }
}
