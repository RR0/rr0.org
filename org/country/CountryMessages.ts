import { OrganizationMessages } from "../OrganizationMessages"

export class CountryMessages<R> extends OrganizationMessages {
  /**
   * Creates a new set of messages for a given country.
   *
   * @param titles The country name
   * @param {R} region The list of regions in this country.
   */
  constructor(titles: string[], readonly region?: R) {
    super(...titles)
  }

  static create<R>(title: string, region?: R) {
    return new CountryMessages<R>([title], region)
  }
}
