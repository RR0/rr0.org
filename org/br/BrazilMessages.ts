import { OrganizationMessages } from "../OrganizationMessages"
import { BrazilRegionCode } from "./region/BrazilRegionCode"

export type BrazilMessages = { [key in BrazilRegionCode]: OrganizationMessages }
