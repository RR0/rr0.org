import { CountryCode } from "./country/CountryCode.js"
import { CountryMessages } from "./country/CountryMessages.js"

export type CountryMessagesList
  = { [key in CountryCode]: CountryMessages<any> }
