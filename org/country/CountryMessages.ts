import { RegionsMessagesList } from "./region/RegionsMessagesList"
import { RR0SsgContext } from "../../RR0SsgContext"

export class CountryMessages<R extends RegionsMessagesList = RegionsMessagesList> {
  /**
   * Creates a new set of messages for a given country.
   *
   * @param title The country name
   * @param {RegionsMessagesList} region The list of regions in this country.
   */
  constructor(readonly title: string, readonly region?: R) {
  }

  toTitle(context: RR0SsgContext): string {
    return this.title
  }
}
