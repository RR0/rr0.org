import { RR0Data } from "../data/RR0Data"
import { Place } from "../place/Place"
import path from "path"
import { RR0SsgContext } from "../RR0SsgContext"
import assert from "assert"
import { OrganizationMessageOptions, OrganizationMessages } from "./OrganizationMessages"
import { TitleMessage } from "./index"
import { RR0Event } from "../event/RR0Event"

export enum OrganizationType {
  country = "country",
  region = "region",
  department = "department",
  city = "city",
}

export class Organization<M extends TitleMessage = OrganizationMessages> implements RR0Data {

  readonly type = "org"

  readonly dirName: string

  events: RR0Event[] = []

  constructor(readonly id: string, readonly places: Place[], readonly kind: OrganizationType,
              readonly parent?: Organization) {
    assert.ok(id, `id must be defined for organization of type ${kind}`)
    this.dirName = path.join(parent?.dirName ?? "org/", id)
    assert.ok(id, `Code must be defined for organization of type ${kind}`)
  }

  getMessages(context: RR0SsgContext): M {
    const parent = this.parent as Organization
    const rootMessages = parent ? parent.getMessages(context) : context.messages
    const messageKind = rootMessages[this.kind]
    assert.ok(messageKind, `Could not find messages of kind "${this.kind}" in ${JSON.stringify(rootMessages)}`)
    const messages = messageKind[this.id]
    assert.ok(messages, `Could not find messages for org "${this.id}" in messages "${JSON.stringify(messageKind)}"`)
    return messages
  }

  getTitle(context: RR0SsgContext, options: OrganizationMessageOptions = {parent: false}): string {
    const messages = this.getMessages(context)
    const parent = this.parent as Organization
    assert.ok(messages, `Could not find name of org "${this.id}" in parent org "${parent?.id}"`)
    let str = messages.title
    if (options.parent && parent) {
      const parentMessages = parent.getMessages(context)
      str += ` (${parentMessages.toTitle(context, parent, options)})`
    }
    return str
  }
}
