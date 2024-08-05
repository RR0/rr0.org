import { RR0Data } from "../RR0Data"
import { Place } from "../place/Place"
import path from "path"
import { RR0SsgContext } from "../RR0SsgContext"
import assert from "assert"
import { OrganizationMessageOptions, OrganizationMessages } from "./OrganizationMessages"
import { TitleMessage } from "./index"

export enum OrganizationType {
  country = "country",
  region = "region",
  department = "department",
  city = "city",
}

export class Organization<M extends TitleMessage = OrganizationMessages> extends RR0Data {

  constructor(id: string, readonly places: Place[], readonly kind: OrganizationType,
              readonly parent?: Organization) {
    super(id, path.join(parent?.dirName ?? "org/", id), undefined, [], "org")
    assert.ok(id, `Code must be defined for organization of type ${kind}`)
  }

  getMessages(context: RR0SsgContext): M {
    const rootMessages = this.parent ? this.parent.getMessages(context) : context.messages
    const messageKind = rootMessages[this.kind]
    assert.ok(messageKind, `Could not find messages of kind "${this.kind}" in ${JSON.stringify(rootMessages)}`)
    const messages = messageKind[this.id]
    assert.ok(messages, `Could not find messages for org "${this.id}" in messages "${JSON.stringify(messageKind)}"`)
    return messages
  }

  getTitle(context: RR0SsgContext, options: OrganizationMessageOptions = {parent: false}): string {
    const messages = this.getMessages(context)
    assert.ok(messages, `Could not find name of org "${this.id}" in parent org "${this.parent?.id}"`)
    let str = messages.title
    if (options.parent && this.parent) {
      const parentMessages = this.parent.getMessages(context)
      str += ` (${parentMessages.toTitle(context, this.parent, options)})`
    }
    return str
  }
}
