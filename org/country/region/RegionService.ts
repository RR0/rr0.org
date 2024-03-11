import { Country } from "../Country"
import { franceRegions } from "../../eu/fr/region/FranceRegions"
import { indiaRegions } from "../../in/IndiaRegions"
import { finlandRegions } from "../../eu/fi/region/FinlandRegions"
import { usaRegions } from "../../us/region/UsaRegions"
import { canadaRegions } from "../../ca/region/CanadaRegions"
import { australiaRegions } from "../../au/region/AustraliaRegions"
import { brazilRegions } from "../../br/region/BrazilRegions"
import { Region } from "./Region"
import { OrganizationService } from "../../OrganizationService"

export class RegionService extends OrganizationService<Region, Country> {
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
