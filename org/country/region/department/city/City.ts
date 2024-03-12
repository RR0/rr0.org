import { Place } from "../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../Organization"

export class City<P extends Organization = Organization> extends Organization {

  constructor(code: string, parent: P, places: Place[]) {
    super(code, places, OrganizationType.city, parent)
  }

  static create(code: string, parent: Organization, place: Place) {
    return new City(code, parent, [place])
  }
}
