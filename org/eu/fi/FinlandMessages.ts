import { RegionMessages } from "../../country/region/RegionMessages"
import { FinlandRegionCode } from "./region/FinlandRegionCode"
import { CountryMessages } from "../../country/CountryMessages"

export type FinlandRegionsMessagesList = { [key in FinlandRegionCode]: RegionMessages<any> }

export class FinlandMessages extends CountryMessages<FinlandRegionsMessagesList> {

  OrganizationcityName(cityStr: string): string {
    let base = super.cityName(cityStr)
    let kuntaPos = base.toLowerCase().indexOf("enkunta")  // "Municipality" suffix
    if (kuntaPos > 0) {
      base = base.substring(0, kuntaPos) + "i"
    }
    return base.trim()
  }
}
