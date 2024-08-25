import { Country } from "../Country"
import { usaRegions } from "../../us/region/UsaRegions"
import { canadaRegions } from "../../ca/region/CanadaRegions"
import { australiaRegions } from "../../au/region/AustraliaRegions"
import { brazilRegions } from "../../br/region/BrazilRegions"
import { europeRegions } from "../../eu/EuropeRegions"
import { Region } from "./Region"
import { OrganizationService } from "../../OrganizationService"
import { countryService } from "../CountryService"
import { indiaRegions } from "../../in/region/IndiaRegions"

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
