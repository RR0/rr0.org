import { UsaSates } from "./UsaSates"
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
import { newYork } from "./ny/NewYork"
import { westVirginia } from "./wv/WestVirginia"
import { virginia } from "./va/Virginia"
import { hawaii } from "./hi/Hawaii"

export const usaRegions: Region[] = [
  alabama,
  usaRegion(UsaSates.ak, Place.fromLocation(47.466667, 0.833333)),
  california,
  usaRegion(UsaSates.ct, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaSates.co, Place.fromLocation(47.466667, 0.833333)),
  delaware,
  florida,
  usaRegion(UsaSates.il, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaSates.in, Place.fromLocation(47.466667, 0.833333)),
  hawaii,
  usaRegion(UsaSates.ky, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaSates.me, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaSates.md, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaSates.ma, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaSates.mi, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaSates.mn, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaSates.ms, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaSates.mo, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaSates.mt, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaSates.ne, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaSates.nh, Place.fromLocation(47.466667, 0.833333)),
  newMexico,
  usaRegion(UsaSates.nc, Place.fromLocation(47.466667, 0.833333)),
  newJersey,
  newYork,
  northCarolina,
  usaRegion(UsaSates.nv, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaSates.oh, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaSates.ok, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaSates.or, Place.fromLocation(47.466667, 0.833333)),
  pennsylvania,
  usaRegion(UsaSates.pr, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaSates.sc, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaSates.tn, Place.fromLocation(47.466667, 0.833333)),
  texas,
  usaRegion(UsaSates.ut, Place.fromLocation(47.466667, 0.833333)),
  virginia,
  usaRegion(UsaSates.vt, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaSates.vi, Place.fromLocation(47.466667, 0.833333)),
  washington,
  usaRegion(UsaSates.wi, Place.fromLocation(47.466667, 0.833333)),
  westVirginia,
  wyoming
]
