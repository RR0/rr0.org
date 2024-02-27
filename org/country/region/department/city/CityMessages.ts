import { City } from "./City"
import { RR0SsgContext } from "../../../../../RR0SsgContext"
import { DepartmentMessagesOptions } from "../DepartmentMessages"
import assert from "assert"

export interface CityMessageOptions extends DepartmentMessagesOptions {
  department: boolean
}

export class CityMessages {
  /**
   *
   * @param {string} title The raw title.
   * @see toTitle() for more complex title strings.
   */
  constructor(readonly title: string) {
  }

  toTitle(context: RR0SsgContext, city: City, opts?: Partial<CityMessageOptions>): string {
    const options = Object.assign({region: false, country: false}, opts)
    const cityMessages = city.messages(context)
    assert.ok(cityMessages,
      `Could not find name of city with ZIP code "${city.zipCode}" in departement "${city.departement.code}"`)
    let str = cityMessages.title
    if (options.department) {
      const departement = city.departement
      const depMessages = departement.messages(context)
      str += ` (${depMessages.toTitle(context, departement, options)})`
    }
    return str
  }
}
