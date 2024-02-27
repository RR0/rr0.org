import { RegionMessages } from "../country/region/RegionMessages"
import { AlDepartmentMessagesList } from "./region/al/AlDepartmentMessagesList"
import { CaDepartmentMessagesList } from "./region/ca/CaDepartmentMessagesList"

export type UsaRegionMessagesList = {
  al: RegionMessages<AlDepartmentMessagesList>
  ca: RegionMessages<CaDepartmentMessagesList>
  fl: RegionMessages
  nm: RegionMessages
  pa: RegionMessages
  tn: RegionMessages
  tx: RegionMessages
  wa: RegionMessages
}
