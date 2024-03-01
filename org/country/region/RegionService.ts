import { Country } from "../Country"
import { franceRegions } from "../../eu/fr/region/FranceRegions"
import { indiaRegions } from "../../in/IndiaRegions"
import { finlandRegions } from "../../eu/fi/region/FinlandRegions"
import { usaRegions } from "../../us/region/UsaRegions"
import { canadaRegions } from "../../ca/region/CanadaRegions"
import { australiaRegions } from "../../au/region/AustraliaRegions"
import { brazilRegions } from "../../br/region/BrazilRegions"
import { RegionMessages } from "./RegionMessages"
import { Organization } from "../../Organization"

/**
 * @deprecated
 */
export class RegionService {

  constructor(protected regions: Organization<RegionMessages>[]) {
  }

  get(code: string, country: Country): Organization<RegionMessages> | undefined {
    return this.regions.find(region => {
      const foundCountry = region.parent === country
      const foundRegion = region.code === code ? region : undefined
      return foundCountry && foundRegion
    })
  }
}

export const regions: Organization<RegionMessages<any>>[] = [
  ...australiaRegions,
  ...brazilRegions,
  ...canadaRegions,
  ...finlandRegions,
  ...franceRegions,
  ...indiaRegions,
  ...usaRegions
]

export const regionService = new RegionService(regions)
