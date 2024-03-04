import { CountryCode } from "./country/CountryCode"
import { CountryMessages } from "./country/CountryMessages"
import { OrganizationMessages } from "./OrganizationMessages"

export type CountryMessagesList
  = { [key in CountryCode]: CountryMessages<any> | OrganizationMessages }
