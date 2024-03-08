import { Place } from "../../../../place/Place"
import { Organization, OrganizationType } from "../../../Organization"

export class Department extends Organization {
  /**
   *
   * @param code The unique code.
   * @param parent The above hierarchu.
   * @param places The geographical place of the department.
   */
  constructor(code: string, parent: Organization, places: Place[]) {
    super(code, places, OrganizationType.department, parent)
  }

  static create(code: string, parent: Organization, place: Place) {
    return new Department(code, parent, [place])
  }
}
