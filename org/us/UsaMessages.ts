import { RegionMessages } from "../country/region/RegionMessages"
import { CaDepartmentMessagesList } from "./region/ca/CaDepartmentMessagesList"
import { OrganizationMessages } from "../OrganizationMessages"

export type UsaRegionMessagesList = {
  al: OrganizationMessages
  ca: RegionMessages<CaDepartmentMessagesList>
  fl: RegionMessages
  in: OrganizationMessages
  nm: RegionMessages
  pa: RegionMessages
  tn: RegionMessages
  tx: RegionMessages
  wa: RegionMessages
}
