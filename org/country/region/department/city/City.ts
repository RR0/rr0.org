import * as assert from "assert"
import { CityMessageOptions, CityMessages } from "./CityMessages"
import { Organization } from "../../../../index"
import { Place } from "../../../../../place/Place"
import { Department } from "../Department"
import { RR0SsgContext } from "../../../../../RR0SsgContext"

/**
 * @deprecated
 */
export class City extends Organization<CityMessages> {

  constructor(code: string, place: Place, parent: Department) {
    super(code, [place], parent)
  }

  messages(context: RR0SsgContext): CityMessages {
    const messages = this.parent.messages(context).city[this.code]
    assert.ok(messages,
      `Could not find messages for city with code "${this.code}" in messages for department "${this.parent.code}"`)
    return messages
  }

  title(context: RR0SsgContext, options?: CityMessageOptions): string {
    const cityMessages = this.messages(context)
    return cityMessages.toTitle(context, this, options)
  }
}
