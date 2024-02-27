import { NorDepartmentMessagesList } from "./NorMessages_fr"
import { RegionMessages } from "../../../../country/region/RegionMessages"

/**
 * Messages about the French Normandy region, translated (see implementations).
 */
export interface NorRegionMessages extends RegionMessages {
  title: string
  department: NorDepartmentMessagesList
}
