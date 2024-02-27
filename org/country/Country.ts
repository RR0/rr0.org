import { CountryCode } from "./CountryCode"
import { CountryMessages } from "./CountryMessages"
import { Rr0Data } from "../../Rr0Data"
import { RR0SsgContext } from "../../RR0SsgContext"
import * as assert from "assert"

export class Country implements Rr0Data {

  readonly dirName: string

  constructor(readonly code: CountryCode) {
    this.dirName = code
  }

  title(context: RR0SsgContext): string {
    return this.messages(context).title
  }

  messages(context: RR0SsgContext): CountryMessages {
    const messages = context.messages.country[this.code]
    assert.ok(messages, `Could not find messages for country with code "${this.code}"`)
    return messages
  }
}
