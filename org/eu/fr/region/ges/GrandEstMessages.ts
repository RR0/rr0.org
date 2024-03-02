import { grandEstDepartmentsMessages } from "./GrandEstDepartmentsMessages"
import { OrganizationMessages } from "../../../../OrganizationMessages"
import { OrganizationType } from "../../../../Organization"

export const grandEstMessages = new OrganizationMessages("Occitanie")
grandEstMessages[OrganizationType.department] = grandEstDepartmentsMessages
