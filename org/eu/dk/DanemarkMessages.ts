import { RegionMessages } from "../../country/region/RegionMessages.js"
import { DenmarkRegionCode } from "./region/DenmarkRegionCode.js"
import { CountryMessages } from "../../country/CountryMessages.js"

export type DanemarkRegionsMessagesList = { [key in DenmarkRegionCode]: RegionMessages<any> }

export class DanemarkMessages extends CountryMessages<DanemarkRegionsMessagesList> {
}
