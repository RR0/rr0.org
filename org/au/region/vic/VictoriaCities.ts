import { City } from "../../../country/region/department/city/City"
import { melbourneVic } from "./melbourne/Melbourne"
import { Organization } from "../../../Organization"
import { OrganizationMessages } from "../../../OrganizationMessages"

export const victoriaCities: City[] | Organization<OrganizationMessages>[] = [
  melbourneVic
]
