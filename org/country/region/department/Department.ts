import { DepartmentMessages } from "./DepartmentMessages"
import { Region } from "../Region"
import { Place } from "../../../../place/Place"
import { RR0SsgContext } from "../../../../RR0SsgContext"
import assert from "assert"
import { Organization, OrganizationType } from "../../../Organization"

/**
 * @deprecated
 */
export class Department extends Organization<DepartmentMessages> {
  /**
   *
   * @param code The unique code.
   * @param region The above hierarchu.
   * @param place The geographical place of the department.
   */
  constructor(code: string, readonly region: Region, place: Place) {
    super(code, [place], OrganizationType.department, region)
  }

  title(context: RR0SsgContext): string {
    return this.messages(context).title
  }

  messages(context: RR0SsgContext): DepartmentMessages {
    const depMessages = this.region.messages(context).department[this.code]
    assert.ok(depMessages,
      `Could not find messages for department "${this.code}" in messages of region "${this.region.code}"`)
    return depMessages
  }
}
