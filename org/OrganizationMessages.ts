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

  toTitle(context: RR0SsgContext, org: Organization, opts?: Partial<OrganizationMessageOptions>): string {
    const options = Object.assign({region: false, country: false}, opts)
    const cityMessages = org.messages(context)
    assert.ok(cityMessages,
      `Could not find name of city with ZIP code "${org.code}" in departement "${org.parent.code}"`)
    let title = cityMessages.title
    return this.toTitleFromName(context, org, title, options)
  }

  toTitleFromName(context: RR0SsgContext, org: Organization, title: string,
                  opts?: { country: boolean; region: boolean } & Partial<OrganizationMessageOptions>) {
    const options = Object.assign({region: false, country: false}, opts)
    let str = org.messages(context).cityName(title)
    if (options.parent) {
      const departement = org.parent
      const depMessages = departement.messages(context)
      str += ` (${depMessages.toTitle(context, departement, options)})`
    }
    return str
  }

  cityName(cityStr: string): string {
    return cityStr.trim()
  }
}
