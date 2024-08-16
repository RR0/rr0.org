import { CountryCode } from "./country/CountryCode"
import { CountryMessages } from "./country/CountryMessages"

export type CountryMessagesList
  = { [key in CountryCode]: CountryMessages<any> }
