import { OrganizationMessages } from "../../../OrganizationMessages.js"
import { CityMessagesList } from "./city/CityMessagesList.js"

export class DepartmentMessages<M = CityMessagesList> extends OrganizationMessages {
  /**
   *
   * @param titles
   * @param city
   * @see toTitle() for more complex title strings.
   */
  constructor(titles: string[], readonly city: M) {
    super(...titles)
  }

  static create<M>(title: string, city: M): DepartmentMessages<M> {
    return new DepartmentMessages<M>([title], city)
  }
}
