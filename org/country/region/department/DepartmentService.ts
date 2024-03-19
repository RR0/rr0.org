import { usaCounties } from "../../../us/region/UsaCounties"
import { OrganizationService } from "../../../OrganizationService"
import { Department } from "./Department"
import { Region } from "../Region"
import { ukDepartments } from "../../../uk/region/UkDepartments"
import { europeDepartments } from "../../../eu/EuropeDepartments"
import { regionService } from "../RegionService"

export class DepartmentService extends OrganizationService<Department, Region> {
}

export const departments: Department[] = [
  ...europeDepartments,
  ...ukDepartments,
  ...usaCounties
]
export const departmentService = new DepartmentService(departments, "org", regionService)
