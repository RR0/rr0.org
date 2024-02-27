import path from "path"
import * as assert from "assert"
import { CityMessageOptions, CityMessages } from "./CityMessages"
import { Organization } from "../../../../index"
import { Place } from "../../../../../place/Place"
import { Department } from "../Department"
import { RR0SsgContext } from "../../../../../RR0SsgContext"

export class City extends Organization<CityMessages> {

  constructor(readonly zipCode: string, place: Place, readonly departement: Department) {
    super([place], path.join(departement.dirName, zipCode))
  }

  messages(context: RR0SsgContext): CityMessages {
    const messages = this.departement.messages(context).city[this.zipCode]
    assert.ok(messages,
      `Could not find messages for city with code "${this.zipCode}" in messages for department "${this.departement.code}"`)
    return messages
  }

  title(context: RR0SsgContext, options?: CityMessageOptions): string {
    const cityMessages = this.messages(context)
    return cityMessages.toTitle(context, this, options)
  }
}
