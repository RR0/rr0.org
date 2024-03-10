import { franceDepartments } from "../../../eu/fr/region/FranceDepartments"
import { finlandDepartments } from "../../../eu/fi/FinlandDepartments"
import { usaDepartments } from "../../../us/region/UsaDepartments"
import { Organization } from "../../../Organization"
import { RR0SsgContext } from "../../../../RR0SsgContext"
import { OrganizationService } from "../../../OrganizationService"

/**
 * @deprecated
 */
export class DepartmentService {

  constructor(readonly departments: Organization[]) {
  }

  get(depCode: string, region: Organization): Organization | undefined {
    return this.departments.find(dep => {
      const foundDep = dep.code === depCode
      const foundRegion = !region || region === dep.parent
      const found = foundDep && foundRegion
      return found ? dep : undefined
    })
  }

  find(context: RR0SsgContext, nameToFind: string, region: Organization): Organization | undefined {
    return this.departments.find(dep => {
      const depMessages = dep.messages(context)
      let found = Boolean(depMessages)
      if (found) {
        const cityNameToFind = OrganizationService.normalizeName(nameToFind)
        const foundDep = !region?.code || region.code === dep.parent.code
        found = false
        for (let i = 0; !found && i < depMessages.titles.length; i++) {
          const depName = OrganizationService.normalizeName(
            depMessages.toTitleFromName(context, dep, depMessages.titles[i]))
          const depCityName = OrganizationService.normalizeName(depName)
          const foundName = depCityName === cityNameToFind
          found = foundName && foundDep
        }
      }
      return found ? dep : undefined
    })
  }
}

export const departments: Organization[] = [
  ...finlandDepartments,
  ...franceDepartments,
  ...usaDepartments
]
export const departmentService = new DepartmentService(departments)
