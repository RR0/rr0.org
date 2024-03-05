import { IndiaRegionCode } from "../../in/IndiaRegionCode"
import { Place } from "../../../place/Place"
import { UsaRegionCode } from "../../us/region/UsaRegionCode"
import { CanadaRegionCode } from "../../ca/region/CanadaRegionCode"
import { AustraliaRegionCode } from "../../au/region/AustraliaRegionCode"
import { BrazilRegionCode } from "../../br/region/BrazilRegionCode"
import { Organization, OrganizationType } from "../../Organization"
import { EuropeRegionCode } from "../../eu/EuropeRegionCode"
import { MexicoRegionCode } from "../../mx/region/MexicoRegionCode"
import { PhilippinesRegionCode } from "../../ph/region/PhilippinesRegionCode"
import { SeychellesRegionCode } from "../../sc/region/SeychellesRegionCode"
import { PeruRegionCode } from "../../pe/region/PeruRegionCode"
import { DominicanRepublicRegionCode } from "../../do/region/DominicanRepublicRegionCode"

export type RegionCode =
  | AustraliaRegionCode
  | BrazilRegionCode
  | CanadaRegionCode
  | DominicanRepublicRegionCode
  | EuropeRegionCode
  | IndiaRegionCode
  | MexicoRegionCode
  | PeruRegionCode
  | PhilippinesRegionCode
  | SeychellesRegionCode
  | UsaRegionCode

export class Region extends Organization {

  constructor(code: RegionCode, country: Organization, places: Place[]) {
    super(code, places, OrganizationType.region, country)
  }
}
