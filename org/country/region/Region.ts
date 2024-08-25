import { Place } from "../../../place/Place"
import { UsaStates } from "../../us/region/UsaStates"
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
import { SouthKoreaRegionCode } from "../../kr/region/SouthKoreaRegionCode"
import { ColombiaRegionCode } from "../../co/region/ColombiaRegionCode"
import { NewZealandRegionCode } from "../../nz/region/NewZealandRegionCode"
import { UkRegionCode } from "../../uk/region/UkRegionCode"
import { RegionMessages } from "./RegionMessages"
import { TitleMessage } from "../../index"
import { IndiaRegionCode } from "../../in/region/IndiaRegionCode"

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
