import { UsaRegionCode } from "./UsaRegionCode"
import { Place } from "../../../place/Place"
import { alabama } from "./al/Alabama"
import { california } from "./ca/California"
import { texas } from "./tx/Texas"
import { florida } from "./fl/Florida"
import { pennsylvania } from "./pa/Pennsylvania"
import { washington } from "./wa/Washington"
import { Region } from "../../country/region/Region"
import { usaRegion } from "../Usa"
import { newMexico } from "./nm/NewMexico"
import { wyoming } from "./wy/Wyoming"
import { delaware } from "./de/Delaware"
import { northCarolina } from "./nc/NorthCarolina"
import { newJersey } from "./nj/NewJersey"

export const usaRegions: Region[] = [
  alabama,
  usaRegion(UsaRegionCode.ak, Place.fromLocation(47.466667, 0.833333)),
  california,
  usaRegion(UsaRegionCode.ct, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.co, Place.fromLocation(47.466667, 0.833333)),
  delaware,
  florida,
  usaRegion(UsaRegionCode.il, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.in, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.ky, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.me, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.md, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.ma, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.mi, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.mn, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.ms, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.mo, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.mt, Place.fromLocation(47.466667, 0.833333)),
  northCarolina,
  usaRegion(UsaRegionCode.ne, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.nh, Place.fromLocation(47.466667, 0.833333)),
  newMexico,
  usaRegion(UsaRegionCode.nc, Place.fromLocation(47.466667, 0.833333)),
  newJersey,
  usaRegion(UsaRegionCode.ny, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.nv, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.oh, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.ok, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.or, Place.fromLocation(47.466667, 0.833333)),
  pennsylvania,
  usaRegion(UsaRegionCode.pr, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.sc, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.tn, Place.fromLocation(47.466667, 0.833333)),
  texas,
  usaRegion(UsaRegionCode.ut, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.va, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.vt, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.vi, Place.fromLocation(47.466667, 0.833333)),
  washington,
  usaRegion(UsaRegionCode.wi, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaRegionCode.wv, Place.fromLocation(47.466667, 0.833333)),
  wyoming
]
