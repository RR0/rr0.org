import { Place } from "../../../../../place/Place"
import { Organization, OrganizationType } from "../../../../Organization"

export class City extends Organization {

  constructor(code: string, parent: Organization, places: Place[]) {
    super(code, places, OrganizationType.city, parent)
  }

  static create(code: string, parent: Organization, place: Place) {
    return new City(code, parent, [place])
  }
}
