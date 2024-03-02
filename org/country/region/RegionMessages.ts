import { RR0SsgContext } from "../../../RR0SsgContext"
import { DepartmentMessagesList } from "./department/DepartmentMessagesList"
import { Organization } from "../../Organization"

export interface RegionMessagesOptions {
  country: boolean
}

export class RegionMessages<D = DepartmentMessagesList> {
  /**
   *
   * @param title
   * @param department
   */
  constructor(readonly title: string, readonly department?: D) {
  }

  toTitle(context: RR0SsgContext, region: Organization, options: RegionMessagesOptions = {country: false}): string {
    const depMessages = region.messages(context)
    if (!depMessages) {
      throw new Error(`Could not find name of region with code "${region.code}" in country "${region.parent.code}"`)
    }
    let str = depMessages.title
    if (options.country) {
      const countryMessages = region.parent.messages(context)
      str += ", " + countryMessages.toTitle(context, region.parent)
    }
    return str
  }
}
