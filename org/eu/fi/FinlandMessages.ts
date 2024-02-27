import { RegionMessages } from "../../country/region/RegionMessages"
import { RegionsMessagesList } from "../../country/region/RegionsMessagesList"
import { CountryMessages } from "../../country/CountryMessages"

export type FinlandRegionsMessagesList = RegionsMessagesList & {
  nk: RegionMessages
}

export class FinlandMessages extends CountryMessages<FinlandRegionsMessagesList> {

  cityName(cityStr: string): string {
    let base = super.cityName(cityStr)
    let kuntaPos = base.toLowerCase().indexOf("enkunta")  // "Municipality" suffix
    if (kuntaPos > 0) {
      base = base.substring(0, kuntaPos) + "i"
    }
    return base.trim()
  }
}
