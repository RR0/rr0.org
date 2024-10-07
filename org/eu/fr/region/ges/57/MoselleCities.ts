import { arsSurMoselle } from "./ArsSurMoselle/ArsSurMoselle.js"
import { City } from "../../../../../country/region/department/city/City.js"
import { forbach } from "./Forbach/Forbach.js"
import { montignyLesMetz } from "./MontignyLesMetz/MontignyLesMetz.js"
import { bouzonville } from "./Bouzonville/Bouzonville.js"

export const moselleCities: City[] = [
  arsSurMoselle,
  bouzonville,
  forbach,
  montignyLesMetz
]
