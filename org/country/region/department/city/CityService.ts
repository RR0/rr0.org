import { City } from "./City"
import { RR0SsgContext } from "../../../../../RR0SsgContext"
import { Department } from "../Department"
import { StringUtil } from "../../../../../util/string/StringUtil"

/**
 * @deprecated
 */
export class CityService {

  constructor(readonly cities: { [p: string]: City }) {
  }

  normalizeName(name: string): string {
    return StringUtil.removeAccents(name.toLowerCase().replaceAll(" ", "-"))
  }

  find(context: RR0SsgContext, nameToFind: string, dep: Department): City | undefined {
    return Object.values(this.cities).find(city => {
      const cityMessages = city.messages(context)
      let found = Boolean(cityMessages)
      if (found) {
        const cityNameToFind = this.normalizeName(nameToFind)
        const foundDep = !dep?.code || dep.code === city.parent.code
        found = false
        for (let i = 0; !found && i < cityMessages.titles.length; i++) {
          const knownCityName = this.normalizeName(cityMessages.titles[i])
          const foundName = knownCityName === cityNameToFind
          found = foundName && foundDep
        }
      }
      return found ? city : undefined
    })
  }
}
