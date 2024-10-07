import { UsaStates } from "./UsaStates.js"
import { Place } from "../../../place/Place.js"
import { alabama } from "./al/Alabama.js"
import { california } from "./ca/California.js"
import { texas } from "./tx/Texas.js"
import { florida } from "./fl/Florida.js"
import { pennsylvania } from "./pa/Pennsylvania.js"
import { washington } from "./wa/Washington.js"
import { Region } from "../../country/region/Region.js"
import { usaRegion } from "../Usa.js"
import { newMexico } from "./nm/NewMexico.js"
import { wyoming } from "./wy/Wyoming.js"
import { delaware } from "./de/Delaware.js"
import { northCarolina } from "./nc/NorthCarolina.js"
import { newJersey } from "./nj/NewJersey.js"
import { newYork } from "./ny/NewYork.js"
import { westVirginia } from "./wv/WestVirginia.js"
import { virginia } from "./va/Virginia.js"
import { hawaii } from "./hi/Hawaii.js"
import { nebraska } from "./ne/Nebraska.js"
import { arkansas } from "./ak/Arkansas.js"
import { connecticut } from "./ct/Connecticut.js"
import { colorado } from "./co/Colorado.js"
import { illinois } from "./il/Illinois.js"
import { indiana } from "./in/Indiana.js"
import { kentucky } from "./ky/Kentucky.js"
import { maine } from "./me/Maine.js"
import { maryland } from "./md/Maryland.js"
import { massachusetts } from "./ma/Massachusetts.js"
import { michigan } from "./mi/Michigan.js"
import { minnesota } from "./mn/Minnesota.js"
import { mississippi } from "./ms/Mississippi.js"
import { missouri } from "./mo/Missouri.js"
import { montana } from "./mt/Montana.js"
import { newHampshire } from "./nh/NewHampshire.js"
import { nevada } from "./nv/Nevada.js"
import { ohio } from "./oh/Ohio.js"
import { oklahoma } from "./ok/Oklahoma.js"
import { oregon } from "./or/Oregon.js"
import { puertoRico } from "./pr/PuertoRico.js"
import { southCarolina } from "./sc/SouthCarolina.js"
import { utah } from "./ut/Utah.js"
import { vermont } from "./vt/Vermont.js"
import { virginIslands } from "./vi/VirginIslands.js"
import { wisconsin } from "./wi/Wisconsin.js"

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
