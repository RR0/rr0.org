import { NkDepartementMessagesList } from "./NkDepartementMessagesList"
import { RegionMessages } from "../../../../country/region/RegionMessages"

export interface NkRegionMessages extends RegionMessages {
  title: string
  department: NkDepartementMessagesList
}
