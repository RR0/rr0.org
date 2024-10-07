import { CountryCode } from "./CountryCode.js"
import { Place } from "../../place/Place.js"
import { Organization, OrganizationType } from "../Organization.js"

export class Country extends Organization {

  constructor(code: CountryCode, places: Place[] = []) {
    super(code, places, OrganizationType.country)
  }
}
