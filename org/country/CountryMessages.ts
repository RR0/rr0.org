import { RR0SsgContext } from "../../RR0SsgContext"
import { TitleMessage } from "../index"

export class CountryMessages<R> implements TitleMessage {
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

  cityName(cityStr: string): string {
    return cityStr.trim()
  }
}
