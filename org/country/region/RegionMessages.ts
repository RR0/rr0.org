import { RR0SsgContext } from "../../../RR0SsgContext"
import { Region } from "./Region"

export interface RegionMessagesOptions {
  country: boolean
}

export class RegionMessages<D> {
  /**
   *
   * @param title
   * @param department
   */
  constructor(readonly title: string, readonly department?: D) {
  }

  toTitle(context: RR0SsgContext, region: Region, options: RegionMessagesOptions = {country: false}): string {
    const depMessages = region.messages(context)
    if (!depMessages) {
      throw new Error(`Could not find name of region with code "${region.code}" in country "${region.country.code}"`)
    }
    let str = depMessages.title
    if (options.country) {
      const countryMessages = region.country.messages(context)
      str += ", " + countryMessages.toTitle(context)
    }
    return str
  }
}
