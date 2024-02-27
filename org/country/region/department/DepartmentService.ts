import { Department } from "./Department"
import { franceDepartments } from "../../../eu/fr/region/FranceDepartments"
import { finlandDepartments } from "../../../eu/fi/FinlandDepartments"
import { Region } from "../Region"
import { usaDepartments } from "../../../us/region/UsaDepartments"

export class DepartmentService {

  constructor(readonly departments: { [name: string]: Department }) {
  }

  get(depCode: string, region: Region): Department | undefined {
    return Object.values(this.departments).find(dep => {
      const foundDep = dep.code === depCode
      const foundRegion = !region || region === dep.region
      const found = foundDep && foundRegion
      return found ? dep : undefined
    })
  }
}

export const departments = {
  ...finlandDepartments,
  ...franceDepartments,
  ...usaDepartments
}
export const departmentService = new DepartmentService(departments)
