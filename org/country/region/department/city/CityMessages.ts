import { City } from "./City"
import { RR0SsgContext } from "../../../../../RR0SsgContext"
import { DepartmentMessagesOptions } from "../DepartmentMessages"
import assert from "assert"

export interface CityMessageOptions extends DepartmentMessagesOptions {
  parent: boolean
}

export class CityMessages {

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

  toTitle(context: RR0SsgContext, city: City, opts?: Partial<CityMessageOptions>): string {
    const options = Object.assign({region: false, country: false}, opts)
    const cityMessages = city.messages(context)
    assert.ok(cityMessages,
      `Could not find name of city with ZIP code "${city.code}" in departement "${city.parent.code}"`)
    let title = cityMessages.title
    return this.toTitleFromName(context, city, title, options)
  }

  toTitleFromName(context: RR0SsgContext, city: City, title: string,
                  opts?: { country: boolean; region: boolean } & Partial<CityMessageOptions>) {
    const options = Object.assign({region: false, country: false}, opts)
    let str = city.parent.parent.parent.messages(context).cityName(title)
    if (options.parent) {
      const departement = city.parent
      const depMessages = departement.messages(context)
      str += ` (${depMessages.toTitle(context, departement, options)})`
    }
    return str
  }
}
