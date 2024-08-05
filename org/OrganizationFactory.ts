import { DefaultDataFactory } from "../DataService"
import { Organization } from "./Organization"

export class OrganizationFactory extends DefaultDataFactory<Organization> {

  constructor() {
    super("org", ["index"])
  }

  protected createFromData(dirName: string, data: Organization): Organization {
    const id = data.id || dirName.replaceAll("/", "-")
    const org = new Organization(id, data.places, data.kind, data.parent)
    Object.assign(org, data)
    return org
  }
}
