import { OrganizationMessages } from "../OrganizationMessages"

/**
 * @template R The region messages type
 */
export class CountryMessages<R> extends OrganizationMessages {
  /**
   * Creates a new set of messages for a given country.
   *
   * @param titles The country name
   * @param {R} region The list of regions messages in this country.
   */
  constructor(titles: string[], readonly region?: R) {
    super(...titles)
  }

  static create<R>(title: string, regionMessages?: R) {
    return new CountryMessages<R>([title], regionMessages)
  }
}
