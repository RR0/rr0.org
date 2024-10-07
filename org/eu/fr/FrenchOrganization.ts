import { OrganizationMessages } from "../../OrganizationMessages.js"

export class FrenchOrganizationMessages extends OrganizationMessages {

  constructor(...titles: string[]) {
    super(...titles)
  }

  cityName(cityStr: string): string {
    return super.cityName(cityStr)
      .replace(/^sainte/ig, "Ste")
      .replace(/^saint/ig, "St")
  }
}
