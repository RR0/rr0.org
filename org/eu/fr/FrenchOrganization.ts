import { OrganizationMessages } from "../../OrganizationMessages"

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
