import { Place } from "../../../place/Place.js"
import { UsaStates } from "../../us/region/UsaStates.js"
import { CanadaRegionCode } from "../../ca/region/CanadaRegionCode.js"
import { AustraliaRegionCode } from "../../au/region/AustraliaRegionCode.js"
import { BrazilRegionCode } from "../../br/region/BrazilRegionCode.js"
import { Organization, OrganizationType } from "../../Organization.js"
import { EuropeRegionCode } from "../../eu/EuropeRegionCode.js"
import { MexicoRegionCode } from "../../mx/region/MexicoRegionCode.js"
import { PhilippinesRegionCode } from "../../ph/region/PhilippinesRegionCode.js"
import { SeychellesRegionCode } from "../../sc/region/SeychellesRegionCode.js"
import { PeruRegionCode } from "../../pe/region/PeruRegionCode.js"
import { DominicanRepublicRegionCode } from "../../do/region/DominicanRepublicRegionCode.js"
import { SouthKoreaRegionCode } from "../../kr/region/SouthKoreaRegionCode.js"
import { ColombiaRegionCode } from "../../co/region/ColombiaRegionCode.js"
import { NewZealandRegionCode } from "../../nz/region/NewZealandRegionCode.js"
import { UkRegionCode } from "../../uk/region/UkRegionCode.js"
import { RegionMessages } from "./RegionMessages.js"
import { TitleMessage } from "../../index.js"
import { IndiaRegionCode } from "../../in/region/IndiaRegionCode.js"

export type RegionCode =
  | AustraliaRegionCode
  | BrazilRegionCode
  | CanadaRegionCode
  | ColombiaRegionCode
  | DominicanRepublicRegionCode
  | UkRegionCode
  | EuropeRegionCode
  | IndiaRegionCode
  | MexicoRegionCode
  | NewZealandRegionCode
  | PeruRegionCode
  | PhilippinesRegionCode
  | SeychellesRegionCode
  | SouthKoreaRegionCode
  | UsaStates

export class Region<M extends TitleMessage = RegionMessages<any>, R = RegionCode> extends Organization<M> {

  constructor(code: R, country: Organization, places: Place[]) {
    super(code, places, OrganizationType.region, country)
  }
}
