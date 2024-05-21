import { RR0SsgContext } from "../RR0SsgContext"
import assert from "assert"
import { Organization } from "./Organization"

export interface OrganizationMessageOptions {
  parent: boolean
}

export class OrganizationMessages {
  readonly titles: string[]

  /**
   *
   * @param {string[]} titles The raw title.
   * @see toTitle() for more complex title strings.
   */
  constructor(...titles: string[]) {
    this.titles = titles
  }

  get title(): string {
    return this.titles[0]
  }

  toTitle(context: RR0SsgContext, org: Organization, options: OrganizationMessageOptions): string {
    const orgMessages = org.getMessages(context)
    assert.ok(orgMessages,
      `Could not find name of city with ZIP code "${org.code}" in departement "${org.parent?.code}"`)
    let title = orgMessages.title
    return this.toTitleFromName(context, org, title, options)
  }

  toTitleFromName(context: RR0SsgContext, org: Organization, title: string, options: OrganizationMessageOptions) {
    let str = org.getMessages(context).cityName(title)
    if (options.parent) {
      const parent = org.parent
      if (parent) {
        const depMessages = parent.getMessages(context)
        str += ` (${depMessages.toTitle(context, parent, options)})`
      }
    }
    return str
  }

  cityName(cityStr: string): string {
    return cityStr.trim()
  }
}
