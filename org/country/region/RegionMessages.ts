import { OrganizationMessages } from "../../OrganizationMessages"
import { DepartmentMessages } from "./department/DepartmentMessages"

export class RegionMessages extends OrganizationMessages {
  /**
   *
   * @param titles
   * @param department
   */
  constructor(titles: string[], readonly department?: DepartmentMessages) {
    super(...titles)
  }

  static create<D>(title: string, department?: DepartmentMessages) {
    return new RegionMessages([title], department)
  }
}
