import { RR0Data } from "../RR0Data"
import { Place } from "../place/Place"
import path from "path"
import { RR0SsgContext } from "../RR0SsgContext"
import assert from "assert"
import { OrgMessageOptions } from "./OrgMessages"
import { OrganizationMessages } from "./OrganizationMessages"
import { TitleMessage } from "./index"

export enum OrganizationType {
  country = "country",
  region = "region",
  department = "department",
  city = "city",
}

export class Organization<M extends TitleMessage = OrganizationMessages> implements RR0Data {

  readonly dirName: string

  constructor(readonly code: string, readonly places: Place[], readonly kind: OrganizationType,
              readonly parent?: Organization) {
    assert.ok(code, `Code must be defined for organization of type ${kind}`)
    this.dirName = path.join(parent?.dirName ?? "org/", code)
  }

  getMessages(context: RR0SsgContext): M {
    const rootMessages = this.parent ? this.parent.getMessages(context) : context.messages
    const messageKind = rootMessages[this.kind]
    assert.ok(messageKind, `Could not find messages of kind "${this.kind}" in ${JSON.stringify(rootMessages)}`)
    const messages = messageKind[this.code]
    assert.ok(messages, `Could not find messages for org "${this.code}" in messages "${JSON.stringify(messageKind)}"`)
    return messages
  }

  getTitle(context: RR0SsgContext, options: OrgMessageOptions = {parent: false}): string {
    const messages = this.getMessages(context)
    assert.ok(messages, `Could not find name of org "${this.code}" in parent org "${this.parent?.code}"`)
    let str = messages.title
    if (options.parent && this.parent) {
      const parentMessages = this.parent.getMessages(context)
      str += ` (${parentMessages.toTitle(context, this.parent, options)})`
    }
    return str
  }
}
