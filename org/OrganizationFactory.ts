import { Organization } from "./Organization.js"
import { TypedDataFactory } from "../data/TypedDataFactory.js"
import { RR0EventFactory } from "../event/RR0EventFactory.js"

export class OrganizationFactory extends TypedDataFactory<Organization> {

  constructor(eventFactory: RR0EventFactory) {
    super(eventFactory, "org", ["index"])
  }

  createFromData(data: Organization): Organization {
    const id = data.id || data.dirName.replaceAll("/", "-")
    const org = new Organization(id, data.places, data.kind, data.parent)
    Object.assign(org, super.createFromData(data))
    return org
  }
}
