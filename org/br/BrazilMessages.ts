import { OrganizationMessages } from "../OrganizationMessages.js"
import { BrazilRegionCode } from "./region/BrazilRegionCode.js"

export type BrazilMessages = { [key in BrazilRegionCode]: OrganizationMessages }
