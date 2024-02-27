import { UsaRegionCode } from "./UsaRegionCode"
import { Place } from "../../../place/Place"
import { usaRegion } from "./UsaRegion"
import { alabama } from "./al/Alabama"
import { california } from "./ca/California"
import { texas } from "./tx/Texas"
import { florida } from "./fl/Florida"
import { pennsylvania } from "./pa/Pennsylvania"
import { washington } from "./wa/Washington"

export const usaRegions = {
  alabama,
  Alaska: usaRegion(UsaRegionCode.ak, Place.fromLocation(47.466667, 0.833333)),
  california,
  Connecticut: usaRegion(UsaRegionCode.ct, Place.fromLocation(47.466667, 0.833333)),
  Colorado: usaRegion(UsaRegionCode.co, Place.fromLocation(47.466667, 0.833333)),
  florida,
  Illinois: usaRegion(UsaRegionCode.il, Place.fromLocation(47.466667, 0.833333)),
  Indiana: usaRegion(UsaRegionCode.in, Place.fromLocation(47.466667, 0.833333)),
  Kentucky: usaRegion(UsaRegionCode.ky, Place.fromLocation(47.466667, 0.833333)),
  Maine: usaRegion(UsaRegionCode.me, Place.fromLocation(47.466667, 0.833333)),
  Maryland: usaRegion(UsaRegionCode.md, Place.fromLocation(47.466667, 0.833333)),
  Massachussets: usaRegion(UsaRegionCode.ma, Place.fromLocation(47.466667, 0.833333)),
  Mississippi: usaRegion(UsaRegionCode.mi, Place.fromLocation(47.466667, 0.833333)),
  Nebraska: usaRegion(UsaRegionCode.ne, Place.fromLocation(47.466667, 0.833333)),
  NewHampshire: usaRegion(UsaRegionCode.nh, Place.fromLocation(47.466667, 0.833333)),
  NewMexico: usaRegion(UsaRegionCode.nm, Place.fromLocation(47.466667, 0.833333)),
  NorthCarolina: usaRegion(UsaRegionCode.nc, Place.fromLocation(47.466667, 0.833333)),
  NewJersey: usaRegion(UsaRegionCode.nj, Place.fromLocation(47.466667, 0.833333)),
  NewYork: usaRegion(UsaRegionCode.ny, Place.fromLocation(47.466667, 0.833333)),
  Nevada: usaRegion(UsaRegionCode.nv, Place.fromLocation(47.466667, 0.833333)),
  Ohio: usaRegion(UsaRegionCode.oh, Place.fromLocation(47.466667, 0.833333)),
  Oklahoma: usaRegion(UsaRegionCode.ok, Place.fromLocation(47.466667, 0.833333)),
  Oregon: usaRegion(UsaRegionCode.or, Place.fromLocation(47.466667, 0.833333)),
  pennsylvania,
  SouthCarolina: usaRegion(UsaRegionCode.sc, Place.fromLocation(47.466667, 0.833333)),
  Tennessee: usaRegion(UsaRegionCode.tn, Place.fromLocation(47.466667, 0.833333)),
  texas,
  Utah: usaRegion(UsaRegionCode.ut, Place.fromLocation(47.466667, 0.833333)),
  Virginia: usaRegion(UsaRegionCode.va, Place.fromLocation(47.466667, 0.833333)),
  Vermont: usaRegion(UsaRegionCode.vt, Place.fromLocation(47.466667, 0.833333)),
  washington,
  Wisconsin: usaRegion(UsaRegionCode.wi, Place.fromLocation(47.466667, 0.833333)),
  WesternVirginia: usaRegion(UsaRegionCode.wv, Place.fromLocation(47.466667, 0.833333))
}
