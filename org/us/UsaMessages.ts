import { RegionMessages } from "../country/region/RegionMessages"
import { CaDepartmentMessagesList } from "./region/ca/CaDepartmentMessagesList"

export type UsaRegionMessagesList = {
  al: RegionMessages
  ca: RegionMessages<CaDepartmentMessagesList>
  fl: RegionMessages
  in: RegionMessages
  nc: RegionMessages
  nm: RegionMessages
  pa: RegionMessages
  tn: RegionMessages
  tx: RegionMessages
  wa: RegionMessages
}
