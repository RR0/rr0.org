import { usaDepartments } from "../../../us/region/UsaDepartments"
import { OrganizationService } from "../../../OrganizationService"
import { Department } from "./Department"
import { Region } from "../Region"
import { ukDepartments } from "../../../uk/region/UkDepartments"
import { europeDepartments } from "../../../eu/EuropeDepartments"

export class DepartmentService extends OrganizationService<Department, Region> {
}

export const departments: Department[] = [
  ...europeDepartments,
  ...ukDepartments,
  ...usaDepartments
]
export const departmentService = new DepartmentService(departments)
