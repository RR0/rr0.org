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
import { mississippi } from "./ms/Mississippi"
import { missouri } from "./mo/Missouri"
import { montana } from "./mt/Montana"
import { newHampshire } from "./nh/NewHampshire"
import { nevada } from "./nv/Nevada"
import { ohio } from "./oh/Ohio"
import { oklahoma } from "./ok/Oklahoma"
import { oregon } from "./or/Oregon"
import { puertoRico } from "./pr/PuertoRico"
import { southCarolina } from "./sc/SouthCarolina"
import { utah } from "./ut/Utah"
import { vermont } from "./vt/Vermont"
import { virginIslands } from "./vi/VirginIslands"
import { wisconsin } from "./wi/Wisconsin"

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
  mississippi,
  missouri,
  montana,
  newHampshire,
  newMexico,
  nebraska,
  newJersey,
  newYork,
  northCarolina,
  nevada,
  ohio,
  oklahoma,
  oregon,
  pennsylvania,
  puertoRico,
  southCarolina,
  usaRegion(UsaStates.tn, Place.fromLocation(47.466667, 0.833333)),
  texas,
  utah,
  virginia,
  vermont,
  virginIslands,
  washington,
  westVirginia,
  wisconsin,
  wyoming
]
