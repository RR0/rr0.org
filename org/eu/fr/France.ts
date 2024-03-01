import { CountryCode } from "../../country/CountryCode"
import { Organization, OrganizationType } from "../../Organization"
import { CountryMessages } from "../../country/CountryMessages"

export const france = new Organization<CountryMessages<any>>(CountryCode.fr, [], OrganizationType.country)
