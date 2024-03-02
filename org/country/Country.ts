import { CountryCode } from "./CountryCode"
import { Place } from "../../place/Place"
import { Organization, OrganizationType } from "../Organization"

export class Country extends Organization {

  constructor(code: CountryCode, places: Place[] = []) {
    super(code, places, OrganizationType.country)
  }
}
