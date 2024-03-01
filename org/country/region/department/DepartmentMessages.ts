import { RR0SsgContext } from "../../../../RR0SsgContext"
import { Department } from "./Department"
import { RegionMessagesOptions } from "../RegionMessages"
import { CityMessagesList } from "./city/CityMessagesList"

/**
 * @deprecated Use OrganizationMessagesOptions
 */
export interface DepartmentMessagesOptions extends RegionMessagesOptions {
  region: boolean
}

/**
 * @deprecated Use OrganizationMessages
 */
export class DepartmentMessages<C extends CityMessagesList = CityMessagesList> {
  /**
   *
   * @param title
   * @param city
   */
  constructor(readonly title: string, readonly city: C) {
  }

  toTitle(context: RR0SsgContext, dep: Department, opts?: Partial<DepartmentMessagesOptions>): string {
    const options = Object.assign({region: false, country: false}, opts)
    const depMessages = dep.messages(context)
    if (!depMessages) {
      throw new Error(`Could not find name of department with code "${dep.code}" in region "${dep.region.code}"`)
    }
    let str = depMessages.title
    if (options.region) {
      const regionMessages = dep.region.messages(context)
      str += `, ${regionMessages.toTitle(context, dep.region, options)}`
    }
    return str
  }
}
