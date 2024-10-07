import { RR0SsgContext } from "../../../../../RR0SsgContext.js"
import { OrganizationService } from "../../../../OrganizationService.js"
import { Department } from "../Department.js"
import { City } from "./City.js"

export class CityService extends OrganizationService<City, Department> {

  protected nameToFind(context: RR0SsgContext, city: City, nameToFind: string): string {
    const cityMessages = city.getMessages(context)
    return cityMessages.cityName(OrganizationService.normalizeName(nameToFind))
  }
}
