import { RR0SsgContext } from "../../../../../RR0SsgContext"
import { Organization } from "../../../../Organization"
import { OrganizationService } from "../../../../OrganizationService"

/**
 * @deprecated
 */
export class CityService {

  constructor(readonly cities: Organization[]) {
  }

  find(context: RR0SsgContext, nameToFind: string, dep: Organization): Organization | undefined {
    return this.cities.find(city => {
      const cityMessages = city.messages(context)
      let found = Boolean(cityMessages)
      if (found) {
        const cityNameToFind = cityMessages.cityName(OrganizationService.normalizeName(nameToFind))
        const foundDep = !dep?.code || dep.code === city.parent.code
        found = false
        for (let i = 0; !found && i < cityMessages.titles.length; i++) {
          const cityName = OrganizationService.normalizeName(
            cityMessages.toTitleFromName(context, city, cityMessages.titles[i]))
          const knownCityName = OrganizationService.normalizeName(cityName)
          const foundName = knownCityName === cityNameToFind
          found = foundName && foundDep
        }
      }
      return found ? city : undefined
    })
  }
}
