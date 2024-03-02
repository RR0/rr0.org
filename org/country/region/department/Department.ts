import { Place } from "../../../../place/Place"
import { Organization, OrganizationType } from "../../../Organization"

export class Department extends Organization {
  /**
   *
   * @param code The unique code.
   * @param parent The above hierarchu.
   * @param place The geographical place of the department.
   */
  constructor(code: string, parent: Organization, place: Place) {
    super(code, [place], OrganizationType.department, parent)
  }
}
