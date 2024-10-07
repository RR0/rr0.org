import { Country } from "../Country.js"
import { usaRegions } from "../../us/region/UsaRegions.js"
import { canadaRegions } from "../../ca/region/CanadaRegions.js"
import { australiaRegions } from "../../au/region/AustraliaRegions.js"
import { brazilRegions } from "../../br/region/BrazilRegions.js"
import { europeRegions } from "../../eu/EuropeRegions.js"
import { Region } from "./Region.js"
import { OrganizationService } from "../../OrganizationService.js"
import { countryService } from "../CountryService.js"
import { indiaRegions } from "../../in/region/IndiaRegions.js"

export class RegionService extends OrganizationService<Region, Country> {
}

export const regions: Region[] = [
  ...australiaRegions,
  ...brazilRegions,
  ...canadaRegions,
  ...europeRegions,
  ...indiaRegions,
  ...usaRegions
]

export const regionService = new RegionService(regions, "org", countryService)
