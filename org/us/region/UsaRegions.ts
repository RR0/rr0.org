import { UsaStates } from "./UsaStates"
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
import { nebraska } from "./ne/Nebraska"
import { arkansas } from "./ak/Arkansas"
import { connecticut } from "./ct/Connecticut"
import { colorado } from "./co/Colorado"
import { illinois } from "./il/Illinois"
import { indiana } from "./in/Indiana"
import { kentucky } from "./ky/Kentucky"
import { maine } from "./me/Maine"
import { maryland } from "./md/Maryland"
import { massachusetts } from "./ma/Massachusetts"
import { michigan } from "./mi/Michigan"
import { minnesota } from "./mn/Minnesota"

export const usaRegions: Region[] = [
  alabama,
  arkansas,
  california,
  connecticut,
  colorado,
  delaware,
  florida,
  illinois,
  indiana,
  hawaii,
  kentucky,
  maine,
  maryland,
  massachusetts,
  michigan,
  minnesota,
  usaRegion(UsaStates.ms, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaStates.mo, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaStates.mt, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaStates.ne, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaStates.nh, Place.fromLocation(47.466667, 0.833333)),
  newMexico,
  usaRegion(UsaStates.nc, Place.fromLocation(47.466667, 0.833333)),
  nebraska,
  newJersey,
  newYork,
  northCarolina,
  usaRegion(UsaStates.nv, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaStates.oh, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaStates.ok, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaStates.or, Place.fromLocation(47.466667, 0.833333)),
  pennsylvania,
  usaRegion(UsaStates.pr, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaStates.sc, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaStates.tn, Place.fromLocation(47.466667, 0.833333)),
  texas,
  usaRegion(UsaStates.ut, Place.fromLocation(47.466667, 0.833333)),
  virginia,
  usaRegion(UsaStates.vt, Place.fromLocation(47.466667, 0.833333)),
  usaRegion(UsaStates.vi, Place.fromLocation(47.466667, 0.833333)),
  washington,
  usaRegion(UsaStates.wi, Place.fromLocation(47.466667, 0.833333)),
  westVirginia,
  wyoming
]
