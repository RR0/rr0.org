import { CountryCode } from "./CountryCode"
import { CountryMessages } from "./CountryMessages"
import { RR0SsgContext } from "../../RR0SsgContext"
import * as assert from "assert"
import { Place } from "../../place/Place"
import { Region } from "./region/Region"
import { Organization, OrganizationType } from "../Organization"

/**
 * @deprecated
 */
export class Country<M extends CountryMessages<Region> = CountryMessages<Region>> extends Organization<M> {

  constructor(code: CountryCode, places: Place[] = []) {
    super(code, places, OrganizationType.country)
  }

  title(context: RR0SsgContext): string {
    return this.messages(context).title
  }

  messages(context: RR0SsgContext): M {
    const messages = context.messages.country[this.code]
    assert.ok(messages, `Could not find messages for country with code "${this.code}"`)
    return messages
  }
}
