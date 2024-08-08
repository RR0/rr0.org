import { Organization } from "./Organization"
import { DefaultDataFactory } from "../DefaultDataFactory"
import { RR0EventFactory } from "../event/RR0EventFactory"

export class OrganizationFactory extends DefaultDataFactory<Organization> {

  constructor(eventFactory: RR0EventFactory) {
    super(eventFactory, "org", ["index"])
  }

  createFromData(data: Organization): Organization {
    const id = data.id || data.dirName.replaceAll("/", "-")
    const org = new Organization(id, data.places, data.kind, data.parent)
    Object.assign(org, data)
    return org
  }
}
