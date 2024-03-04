import { RR0SsgContext } from "../../../../../RR0SsgContext"
import { StringUtil } from "../../../../../util/string/StringUtil"
import { Organization } from "../../../../Organization"

/**
 * @deprecated
 */
export class CityService {

  constructor(readonly cities: Organization[]) {
  }

  normalizeName(name: string): string {
    return StringUtil.removeAccents(name.toLowerCase().replaceAll(" ", "-"))
  }

  find(context: RR0SsgContext, nameToFind: string, dep: Organization): Organization | undefined {
    return this.cities.find(city => {
      const cityMessages = city.messages(context)
      let found = Boolean(cityMessages)
      if (found) {
        const cityNameToFind = cityMessages.cityName(this.normalizeName(nameToFind))
        const foundDep = !dep?.code || dep.code === city.parent.code
        found = false
        for (let i = 0; !found && i < cityMessages.titles.length; i++) {
          const cityName = this.normalizeName(cityMessages.toTitleFromName(context, city, cityMessages.titles[i]))
          const knownCityName = this.normalizeName(cityName)
          const foundName = knownCityName === cityNameToFind
          found = foundName && foundDep
        }
      }
      return found ? city : undefined
    })
  }
}
