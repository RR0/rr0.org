import { Region } from "./Region"
import { Country } from "../Country"
import { franceRegions } from "../../eu/fr/region/FranceRegions"
import { australiaRegions } from "../../au/AustraliaRegions"
import { indiaRegions } from "../../in/IndiaRegions"
import { finlandRegions } from "../../eu/fi/region/FinlandRegions"
import { usaRegions } from "../../us/region/UsaRegions"
import { canadaRegions } from "../../ca/region/CanadaRegions"

export class RegionService {

  constructor(readonly regions: { [p: string]: Region }) {
  }

  get(code: string, country: Country): Region | undefined {
    return Object.values(this.regions).find(region => {
      const foundCountry = region.country === country
      const foundRegion = region.code === code ? region : undefined
      return foundCountry && foundRegion
    })
  }
}

export const regions = {
  ...australiaRegions,
  ...canadaRegions,
  ...finlandRegions,
  ...franceRegions,
  ...indiaRegions,
  ...usaRegions
}

export const regionService = new RegionService(regions)
