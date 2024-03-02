import { OrganizationMessages } from "../../OrganizationMessages"

export class RegionMessages<D> extends OrganizationMessages {
  /**
   *
   * @param title
   * @param department
   */
  constructor(title: string, readonly department?: D) {
    super(...[title])
  }
}
