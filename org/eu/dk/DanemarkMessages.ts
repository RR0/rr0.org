import { RegionMessages } from "../../country/region/RegionMessages"
import { DenmarkRegionCode } from "./region/DenmarkRegionCode"
import { CountryMessages } from "../../country/CountryMessages"

export type DanemarkRegionsMessagesList = { [key in DenmarkRegionCode]: RegionMessages<any> }

export class DanemarkMessages extends CountryMessages<DanemarkRegionsMessagesList> {
}
