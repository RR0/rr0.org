import { franceDepartments } from "../../../eu/fr/region/FranceDepartments"
import { finlandDepartments } from "../../../eu/fi/FinlandDepartments"
import { usaDepartments } from "../../../us/region/UsaDepartments"
import { Organization } from "../../../Organization"

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
}

export const departments: Organization[] = [
  ...finlandDepartments,
  ...franceDepartments,
  ...usaDepartments
]
export const departmentService = new DepartmentService(departments)
