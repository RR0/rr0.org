import { ParisCityCode } from "./ParisCityCode"
import { paris75Messages } from "./paris/ParisMessages"
import { DepartmentMessages } from "../../../../../country/region/department/DepartmentMessages"

export const parisCityMessages: { [key in ParisCityCode]: OrganizationMessages } = {
  [ParisCityCode.Paris]: paris75Messages
}

export const parisMessages = new DepartmentMessages("Paris", parisCityMessages)
