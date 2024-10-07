import { usaCounties } from "../../../us/region/UsaCounties.js"
import { OrganizationService } from "../../../OrganizationService.js"
import { Department } from "./Department.js"
import { Region } from "../Region.js"
import { ukDepartments } from "../../../uk/region/UkDepartments.js"
import { europeDepartments } from "../../../eu/EuropeDepartments.js"
import { regionService } from "../RegionService.js"

export class DepartmentService extends OrganizationService<Department, Region> {
}

export const departments: Department[] = [
  ...europeDepartments,
  ...ukDepartments,
  ...usaCounties
]
export const departmentService = new DepartmentService(departments, "org", regionService)
