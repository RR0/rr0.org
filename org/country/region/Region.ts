import { FranceRegionCode } from "../../eu/fr/region/FranceRegionCode"
import { RegionCode_in } from "../../in/RegionCode_in"
import { RegionMessages } from "./RegionMessages"
import { Country } from "../Country"
import { Place } from "../../../place/Place"
import { RR0SsgContext } from "../../../RR0SsgContext"
import { FinlandRegionCode } from "../../eu/fi/region/FinlandRegionCode"
import { UsaRegionCode } from "../../us/region/UsaRegionCode"
import * as assert from "assert"
import { CanadaRegionCode } from "../../ca/region/CanadaRegionCode"
import { AustraliaRegionCode } from "../../au/region/AustraliaRegionCode"
import { BrazilRegionCode } from "../../br/region/BrazilRegionCode"
import { CountryMessages } from "../CountryMessages"
import { Organization, OrganizationType } from "../../Organization"

export type RegionCode_eu = FranceRegionCode | FinlandRegionCode

export type RegionCode =
  RegionCode_eu
  | UsaRegionCode
  | CanadaRegionCode
  | RegionCode_in
  | AustraliaRegionCode
  | BrazilRegionCode

/**
 * @deprecated
 */
export class Region extends Organization<RegionMessages<any>> {

  constructor(code: RegionCode, readonly country: Country | Organization<CountryMessages<Region>>, places: Place[]) {
    super(code, places, OrganizationType.region, country)
  }

  messages(context: RR0SsgContext): RegionMessages<any> {
    const messages = this.country.messages(context)
    const message = messages.region[this.code]
    assert.ok(message,
      `Could not find messages for region "${this.code}" in messages for country "${this.country.code}"`)
    return message
  }

  title(context: RR0SsgContext): string {
    return this.messages(context)?.title
  }
}
