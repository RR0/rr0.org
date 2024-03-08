import { Country } from "../Country"
import { franceRegions } from "../../eu/fr/region/FranceRegions"
import { indiaRegions } from "../../in/IndiaRegions"
import { finlandRegions } from "../../eu/fi/region/FinlandRegions"
import { usaRegions } from "../../us/region/UsaRegions"
import { canadaRegions } from "../../ca/region/CanadaRegions"
import { australiaRegions } from "../../au/region/AustraliaRegions"
import { brazilRegions } from "../../br/region/BrazilRegions"
import { Region } from "./Region"

/**
 * @deprecated
 */
export class RegionService {

  constructor(protected regions: Region[]) {
  }

  get(code: string, country: Country): Region | undefined {
    return this.regions.find(region => {
      const foundCountry = !country || region.parent === country
      const foundRegion = region.code === code ? region : undefined
      return foundCountry && foundRegion
    })
  }
}

export const regions: Region[] = [
  ...australiaRegions,
  ...brazilRegions,
  ...canadaRegions,
  ...finlandRegions,
  ...franceRegions,
  ...indiaRegions,
  ...usaRegions
]

export const regionService = new RegionService(regions)
