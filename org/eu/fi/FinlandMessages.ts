import { RegionMessages } from "../../country/region/RegionMessages.js"
import { FinlandRegionCode } from "./region/FinlandRegionCode.js"
import { CountryMessages } from "../../country/CountryMessages.js"

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
