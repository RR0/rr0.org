import { OrganizationMessages } from "../OrganizationMessages"

export class CountryMessages<R> extends OrganizationMessages {
  /**
   * Creates a new set of messages for a given country.
   *
   * @param title The country name
   * @param {RegionsMessagesList} region The list of regions in this country.
   */
  constructor(title: string, readonly region?: R) {
    super(title)
  }
}
