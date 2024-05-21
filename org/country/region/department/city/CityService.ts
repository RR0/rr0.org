import { RR0SsgContext } from "../../../../../RR0SsgContext"
import { OrganizationService } from "../../../../OrganizationService"
import { Department } from "../Department"
import { City } from "./City"

export class CityService extends OrganizationService<City, Department> {

  protected nameToFind(context: RR0SsgContext, city: City, nameToFind: string): string {
    const cityMessages = city.getMessages(context)
    return cityMessages.cityName(OrganizationService.normalizeName(nameToFind))
  }
}
