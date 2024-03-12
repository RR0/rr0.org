import { OrganizationMessages } from "../../OrganizationMessages"

export class RegionMessages<D = OrganizationMessages> extends OrganizationMessages {
  /**
   *
   * @param titles
   * @param department
   */
  constructor(titles: string[], readonly department?: D) {
    super(...titles)
  }

  static create<D>(title: string, department?: D) {
    return new RegionMessages([title], department)
  }
}
