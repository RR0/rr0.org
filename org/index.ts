import { Rr0Data } from "../Rr0Data"
import { Place } from "../place/Place"
import path from "path"
import { RR0SsgContext } from "../RR0SsgContext"
import assert from "assert"
import { OrgMessageOptions } from "./OrgMessages"

export interface TitleMessage {
  title: string
}

export class Organization<M extends TitleMessage> implements Rr0Data {

  readonly dirName: string

  constructor(readonly code: string, readonly places: Place[], readonly parent?: Organization<any>) {
    this.dirName = path.join(parent?.dirName ?? "org/", code)
  }

  messages(context: RR0SsgContext): M {
    const root = this.parent ? this.parent.messages(context) : context.messages
    const messages = root[this.code]
    assert.ok(messages,
      `Could not find messages for org with code "${this.code}" in messages for parent org "${messages}"`)
    return messages
  }

  title(context: RR0SsgContext, options: OrgMessageOptions = {parent: false}): string {
    const messages = this.messages(context)
    assert.ok(messages, `Could not find name of org "${this.code}" in parent org "${this.parent.code}"`)
    let str = messages.title
    if (options.parent) {
      const parentMessages = this.parent.messages(context)
      str += ` (${parentMessages.toTitle(context, parent, options)})`
    }
    return str
  }
}
